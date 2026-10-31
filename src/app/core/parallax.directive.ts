import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, NgZone, OnDestroy, afterNextRender, inject, input } from '@angular/core';

/**
 * Scroll parallax using the independent `translate` property, so it never fights with
 * `transform`-based entrance animations. Positive speed drifts with the page, negative against it.
 *   <div class="nx-orb" appParallax="-0.15"></div>
 */
@Directive({ selector: '[appParallax]', standalone: true })
export class ParallaxDirective implements OnDestroy {
  readonly appParallax = input<number | string>(0.1);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private frame = 0;
  private visible = true;
  private io?: IntersectionObserver;
  private win?: Window;

  constructor() {
    afterNextRender(() => {
      this.win = this.doc.defaultView as Window;
      if (this.win.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.zone.runOutsideAngular(() => {
        this.win!.addEventListener('scroll', this.onScroll, { passive: true });
        this.win!.addEventListener('resize', this.onScroll, { passive: true });
        if (typeof IntersectionObserver !== 'undefined') {
          this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; if (this.visible) this.onScroll(); }, { rootMargin: '200px' });
          this.io.observe(this.el.nativeElement);
        }
        this.update();
      });
    });
  }

  private onScroll = (): void => {
    if (!this.visible || this.frame) return;
    this.frame = requestAnimationFrame(() => { this.frame = 0; this.update(); });
  };

  private update(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const win = this.win as Window;
    const distanceFromCenter = rect.top + rect.height / 2 - win.innerHeight / 2;
    const y = -distanceFromCenter * Number(this.appParallax());
    this.el.nativeElement.style.translate = `0 ${y.toFixed(1)}px`;
  }

  ngOnDestroy(): void {
    this.win?.removeEventListener('scroll', this.onScroll);
    this.win?.removeEventListener('resize', this.onScroll);
    this.io?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }
}
