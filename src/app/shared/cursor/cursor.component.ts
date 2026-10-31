import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, afterNextRender, inject } from '@angular/core';

const INTERACTIVE = 'a, button, [role="button"], .nx-card, [data-cursor], summary, label[for]';
const TEXTUAL = 'input, textarea, select';

/**
 * Reactive trailing cursor: a precise dot, a lagging ring and a soft glow trail.
 * Scales and boosts glow over interactive targets. Disabled on touch / reduced-motion.
 * The native cursor is kept for usability.
 */
@Component({
  selector: 'app-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <div class="glow" #glow></div>
    <div class="ring" #ring><i></i></div>
    <div class="dot" #dot></div>
  `,
  styleUrl: './cursor.component.css'
})
export class CursorComponent implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);

  private win!: Window;
  private raf = 0;
  private active = false;
  private mx = -200; private my = -200;
  private rx = -200; private ry = -200;
  private gx = -200; private gy = -200;
  private seen = false;

  constructor() {
    afterNextRender(() => {
      this.win = this.doc.defaultView as Window;
      const fine = this.win.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reduced = this.win.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!fine || reduced) return;
      this.active = true;
      this.zone.runOutsideAngular(() => {
        this.win.addEventListener('mousemove', this.onMove, { passive: true });
        this.doc.addEventListener('mouseover', this.onOver, { passive: true });
        this.doc.addEventListener('mousedown', this.onDown);
        this.doc.addEventListener('mouseup', this.onUp);
        this.doc.documentElement.addEventListener('mouseleave', this.onLeave);
        this.doc.documentElement.addEventListener('mouseenter', this.onEnter);
      });
    });
  }

  private get el(): HTMLElement { return this.host.nativeElement; }

  private onMove = (e: MouseEvent): void => {
    this.mx = e.clientX; this.my = e.clientY;
    if (!this.seen) { this.seen = true; this.rx = this.gx = this.mx; this.ry = this.gy = this.my; this.el.classList.add('on'); }
    if (!this.raf) this.raf = requestAnimationFrame(this.loop);
  };

  private onOver = (e: MouseEvent): void => {
    const t = e.target as Element | null;
    const textual = !!t?.closest?.(TEXTUAL);
    const hover = !textual && !!t?.closest?.(INTERACTIVE);
    this.el.classList.toggle('is-hover', hover);
    this.el.classList.toggle('is-text', textual);
  };

  private onDown = (): void => this.el.classList.add('is-down');
  private onUp = (): void => this.el.classList.remove('is-down');
  private onLeave = (): void => this.el.classList.remove('on');
  private onEnter = (): void => { if (this.seen) this.el.classList.add('on'); };

  private loop = (): void => {
    this.rx += (this.mx - this.rx) * 0.2;
    this.ry += (this.my - this.ry) * 0.2;
    this.gx += (this.mx - this.gx) * 0.08;
    this.gy += (this.my - this.gy) * 0.08;

    const [glow, ring, dot] = Array.from(this.el.children) as HTMLElement[];
    dot.style.transform = `translate3d(${this.mx}px, ${this.my}px, 0)`;
    ring.style.transform = `translate3d(${this.rx}px, ${this.ry}px, 0)`;
    glow.style.transform = `translate3d(${this.gx}px, ${this.gy}px, 0)`;

    const settled = Math.abs(this.mx - this.gx) < 0.3 && Math.abs(this.my - this.gy) < 0.3;
    this.raf = settled ? 0 : requestAnimationFrame(this.loop);
  };

  ngOnDestroy(): void {
    if (!this.active) return;
    this.win.removeEventListener('mousemove', this.onMove);
    this.doc.removeEventListener('mouseover', this.onOver);
    this.doc.removeEventListener('mousedown', this.onDown);
    this.doc.removeEventListener('mouseup', this.onUp);
    this.doc.documentElement.removeEventListener('mouseleave', this.onLeave);
    this.doc.documentElement.removeEventListener('mouseenter', this.onEnter);
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
