import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

import { PIPELINE_ROWS } from '../../../systems.config';
import { GlowCardDirective } from '../../core/glow-card.directive';
import { IconComponent } from '../../shared/icon/icon.component';

/** Glassmorphic "live pipeline" node card shown in the hero. Telemetry is illustrative and always sub-100ms. */
@Component({
  selector: 'app-pipeline-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, GlowCardDirective],
  templateUrl: './pipeline-card.component.html',
  styleUrl: './pipeline-card.component.css'
})
export class PipelineCardComponent {
  protected readonly rows = PIPELINE_ROWS;
  protected readonly latency = signal(72);
  protected readonly bars = signal<number[]>([46, 52, 40, 58, 49, 63, 44, 55, 60, 42, 51, 57, 47, 62, 45, 54, 59, 41, 53, 61, 48, 56, 43, 50]);

  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const win = this.doc.defaultView as Window;
      if (win.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const id = win.setInterval(() => {
        const next = 58 + Math.round(Math.random() * 34); // 58–92ms
        this.latency.set(next);
        this.bars.update(b => [...b.slice(1), Math.round(((next - 40) / 60) * 100)]);
      }, 1100);
      this.destroyRef.onDestroy(() => win.clearInterval(id));
    });
  }
}
