import { Directive, ElementRef, NgZone, OnDestroy, afterNextRender, inject } from '@angular/core';

/** Feeds the pointer position into `--mx` / `--my` so `.nx-card` can render a cursor-following spotlight. */
@Directive({ selector: '[appGlow]', standalone: true })
export class GlowCardDirective implements OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);

  constructor() {
    afterNextRender(() => {
      this.zone.runOutsideAngular(() => {
        this.el.nativeElement.addEventListener('pointermove', this.onMove, { passive: true });
      });
    });
  }

  private onMove = (e: PointerEvent): void => {
    const r = this.el.nativeElement.getBoundingClientRect();
    this.el.nativeElement.style.setProperty('--mx', `${e.clientX - r.left}px`);
    this.el.nativeElement.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  ngOnDestroy(): void { this.el.nativeElement.removeEventListener('pointermove', this.onMove); }
}
