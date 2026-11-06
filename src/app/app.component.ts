import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, ViewChild, afterNextRender, inject, signal
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';

import { SITE } from '../systems.config';
import { CursorComponent } from './shared/cursor/cursor.component';
import { IconComponent } from './shared/icon/icon.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DottedSurfaceComponent } from './components/ui/dotted-surface/dotted-surface.component';
import { SpiralAnimationComponent } from './components/ui/spiral-animation/spiral-animation.component';
import { SmoothScrollService } from './core/smooth-scroll.service';
import { UiStateService } from './core/ui-state.service';
import { CredibilityModalComponent } from './components/credibility-modal/credibility-modal.component';

const INTRO_KEY = 'neurix-intro-seen';
const STATUS_STEPS = ['Initializing inference core', 'Loading vision pipelines', 'Securing AES-256 layer', 'Systems online'];

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, CursorComponent, IconComponent, NavbarComponent, FooterComponent, DottedSurfaceComponent, SpiralAnimationComponent, CredibilityModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  protected readonly site = SITE;
  protected readonly showLoader = signal(true);
  protected readonly progress = signal(0);
  protected readonly status = signal(STATUS_STEPS[0]);
  protected readonly showTop = signal(false);

  @ViewChild('loader') private loaderRef?: ElementRef<HTMLElement>;
  @ViewChild('main', { static: true }) private mainRef!: ElementRef<HTMLElement>;

  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private readonly smooth = inject(SmoothScrollService);
  private readonly ui = inject(UiStateService);
  private readonly viewport = inject(ViewportScroller);
  private timeline?: gsap.core.Timeline;
  private win?: Window;

  constructor() {
    afterNextRender(() => {
      this.win = this.doc.defaultView as Window;
      this.smooth.init();
      // Anchor links (e.g. /services#ai-rag) must land below the fixed navbar; the router ignores CSS scroll-margin.
      this.viewport.setOffset(() => [0, (this.doc.querySelector<HTMLElement>('header.nav')?.offsetHeight ?? 72) + 24]);
      this.watchScroll();
      this.runIntro();
    });
  }

  private runIntro(): void {
    const win = this.win as Window;
    let seen = false;
    try { seen = win.sessionStorage.getItem(INTRO_KEY) === '1'; } catch { /* storage unavailable */ }
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || reduced) {
      this.showLoader.set(false);
      this.ui.markReady();
      return;
    }

    this.smooth.stop();
    const state = { p: 0 };
    this.zone.runOutsideAngular(() => {
      this.timeline = gsap.timeline({
        onComplete: () => this.zone.run(() => this.finishIntro())
      });
      this.timeline.to(state, {
        p: 1, duration: 2.1, ease: 'power2.inOut',
        onUpdate: () => this.zone.run(() => {
          this.progress.set(state.p);
          this.status.set(STATUS_STEPS[Math.min(STATUS_STEPS.length - 1, Math.floor(state.p * STATUS_STEPS.length))]);
        })
      });
    });
  }

  private finishIntro(): void {
    try { (this.win as Window).sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* ignore */ }
    const el = this.loaderRef?.nativeElement;
    this.smooth.start();
    this.ui.markReady();
    if (!el) { this.showLoader.set(false); return; }
    this.zone.runOutsideAngular(() => {
      gsap.to(el, {
        opacity: 0, scale: 1.04, filter: 'blur(10px)', duration: 0.7, ease: 'power2.inOut',
        onComplete: () => this.zone.run(() => this.showLoader.set(false))
      });
    });
  }
protected isModalOpen = false;
protected selectedCaseData: any = null;

// Add these methods to handle modal state:
protected openCredibilityModal(caseData: any): void {
  this.selectedCaseData = caseData;
  this.isModalOpen = true;
}

protected closeCredibilityModal(): void {
  this.isModalOpen = false;
  this.selectedCaseData = null;
}
  protected skipIntro(): void { this.timeline?.timeScale(6); }

  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.mainRef.nativeElement.focus({ preventScroll: true });
    this.smooth.scrollTo(0, true);
  }

  protected toTop(): void { this.smooth.scrollTo(0); }

  private watchScroll(): void {
    const win = this.win as Window;
    this.zone.runOutsideAngular(() => {
      win.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  private onScroll = (): void => {
    const next = (this.win as Window).scrollY > 700;
    if (next !== this.showTop()) this.zone.run(() => this.showTop.set(next));
  };

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.win?.removeEventListener('scroll', this.onScroll);
  }
}
