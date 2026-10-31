import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { UiStateService } from './ui-state.service';

export type RevealVariant = 'up' | 'left' | 'right' | '';

/**
 * Scroll-triggered entrance. Hosts must register `REVEAL_ANIMATIONS` in their component `animations`.
 *   <div appReveal [revealDelay]="i * 90">            fade-up with stagger
 *   <div appReveal="left">                              slide in from the left
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { '[@fadeUp]': 'binding()' }
})
export class RevealDirective implements OnDestroy {
  readonly appReveal = input<RevealVariant>('');
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ui = inject(UiStateService);
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly inView = signal(false);
  private reduced = false;
  private observer?: IntersectionObserver;

  private readonly visible = computed(() => this.inView() && this.ui.ready());

  readonly binding = computed(() => {
    const variant = this.appReveal();
    const hidden = variant === 'left' ? 'hiddenLeft' : variant === 'right' ? 'hiddenRight' : 'hidden';
    return {
      value: this.visible() ? 'visible' : hidden,
      params: { delay: this.reduced ? 0 : this.revealDelay(), dur: this.reduced ? 0 : 750 }
    };
  });

  constructor() {
    afterNextRender(() => {
      const win = this.doc.defaultView as Window;
      this.reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this.reduced || typeof IntersectionObserver === 'undefined') {
        this.inView.set(true);
        return;
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some(e => e.isIntersecting)) {
            this.inView.set(true);
            this.observer?.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}
