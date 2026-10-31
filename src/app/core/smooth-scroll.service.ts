import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';

/**
 * Lenis-style inertial smooth scrolling (dependency-free).
 *  - Intercepts mouse-wheel / trackpad input and eases the window toward the target (frame-rate independent lerp).
 *  - Leaves touch, keyboard, scrollbar-drag and anchor navigation native, then re-syncs.
 *  - Nested scroll containers (or any element flagged `data-lenis-prevent`) keep native scrolling.
 *  - Disabled automatically for `prefers-reduced-motion`.
 */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private initialised = false;
  private enabled = false;
  private locked = false;
  private rafId = 0;
  private running = false;
  private current = 0;
  private target = 0;
  private lastSet = 0;
  private lastTime = 0;

  /** Higher = snappier. ~9 gives a premium, slightly floaty feel. */
  private readonly smoothing = 9;
  private readonly wheelMultiplier = 1;

  init(): void {
    if (!this.isBrowser || this.initialised) return;
    this.initialised = true;
    const win = this.doc.defaultView as Window;
    if (win.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.enabled = true;
    this.current = this.target = this.lastSet = win.scrollY;
    this.doc.documentElement.classList.add('nx-smooth');

    this.zone.runOutsideAngular(() => {
      win.addEventListener('wheel', this.onWheel, { passive: false });
      win.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  /** Locks scrolling (mobile menu open). */
  stop(): void {
    this.locked = true;
    this.cancel();
    this.doc.documentElement.classList.add('nx-scroll-locked');
  }

  start(): void {
    this.locked = false;
    this.doc.documentElement.classList.remove('nx-scroll-locked');
    this.sync();
  }

  scrollTo(y: number, immediate = false): void {
    if (!this.isBrowser) return;
    const win = this.doc.defaultView as Window;
    const max = this.limit();
    const dest = Math.min(Math.max(y, 0), max);
    if (immediate || !this.enabled) {
      this.cancel();
      win.scrollTo(0, dest);
      this.sync();
      return;
    }
    this.sync();
    this.target = dest;
    this.begin();
  }

  private limit(): number {
    const win = this.doc.defaultView as Window;
    return Math.max(0, this.doc.documentElement.scrollHeight - win.innerHeight);
  }

  private sync(): void {
    const y = (this.doc.defaultView as Window).scrollY;
    this.current = this.target = this.lastSet = y;
  }

  private cancel(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  private begin(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private tick = (now: number): void => {
    if (!this.running) return;
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    const factor = 1 - Math.exp(-this.smoothing * dt);
    this.current += (this.target - this.current) * factor;

    if (Math.abs(this.target - this.current) < 0.4) {
      this.current = this.target;
      this.running = false;
    }
    (this.doc.defaultView as Window).scrollTo(0, this.current);
    this.lastSet = (this.doc.defaultView as Window).scrollY;
    if (this.running) this.rafId = requestAnimationFrame(this.tick);
  };

  private onWheel = (e: WheelEvent): void => {
    if (this.locked || e.ctrlKey || e.defaultPrevented) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal gesture: leave native
    if (this.shouldIgnore(e.target as Element | null)) return;

    const win = this.doc.defaultView as Window;
    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 16;
    else if (e.deltaMode === 2) delta *= win.innerHeight;

    if (!this.running) this.sync();
    e.preventDefault();
    this.target = Math.min(Math.max(this.target + delta * this.wheelMultiplier, 0), this.limit());
    this.begin();
  };

  /** External scroll (keyboard, scrollbar drag, router) while we are idle or diverged: adopt it. */
  private onScroll = (): void => {
    const y = (this.doc.defaultView as Window).scrollY;
    if (Math.abs(y - this.lastSet) > 2) {
      this.cancel();
      this.current = this.target = this.lastSet = y;
    }
  };

  private shouldIgnore(el: Element | null): boolean {
    let node: Element | null = el;
    const body = this.doc.body;
    while (node && node !== body && node !== this.doc.documentElement) {
      if (node.hasAttribute('data-lenis-prevent')) return true;
      const style = (this.doc.defaultView as Window).getComputedStyle(node);
      const scrollable = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1;
      if (scrollable) return true;
      node = node.parentElement;
    }
    return false;
  }
}
