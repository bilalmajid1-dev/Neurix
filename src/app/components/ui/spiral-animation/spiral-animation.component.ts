import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, ViewChild, afterNextRender, inject, input } from '@angular/core';

/**
 * "Neural core" mark for the intro loader: a glowing nucleus with orbiting rings and nodes
 * in Electric Cyan / Hyper Purple. `progress` (0..1) drives how much of the structure is drawn.
 */
@Component({
  selector: 'app-spiral-animation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  templateUrl: './spiral-animation.component.html',
  styleUrl: './spiral-animation.component.css'
})
export class SpiralAnimationComponent implements OnDestroy {
  /** Draw progress, 0..1 (read every frame, so a plain object property is enough). */
  readonly progress = input(1);

  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private raf = 0;
  private alive = true;

  constructor() {
    afterNextRender(() => {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const win = this.doc.defaultView as Window;
      const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dpr = Math.min(win.devicePixelRatio || 1, 2);
      const size = 240;
      canvas.width = size * dpr; canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rings = [
        { rx: 98, ry: 38, rot: 0.2, nodes: 5, speed: 0.55, color: '0,229,255' },
        { rx: 98, ry: 38, rot: 1.25, nodes: 5, speed: -0.4, color: '139,0,255' },
        { rx: 98, ry: 38, rot: 2.3, nodes: 4, speed: 0.3, color: '0,229,255' }
      ];

      this.zone.runOutsideAngular(() => {
        const frame = (ms: number) => {
          if (!this.alive) return;
          const t = reduced ? 0 : ms / 1000;
          const p = Math.min(Math.max(this.progress(), 0), 1);
          ctx.clearRect(0, 0, size, size);
          ctx.save();
          ctx.translate(size / 2, size / 2);

          const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 70);
          glow.addColorStop(0, `rgba(0,229,255,${0.55 * p})`);
          glow.addColorStop(0.5, `rgba(139,0,255,${0.22 * p})`);
          glow.addColorStop(1, 'rgba(139,0,255,0)');
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(0, 0, 70, 0, Math.PI * 2); ctx.fill();

          rings.forEach((r, ri) => {
            const ringP = Math.min(Math.max(p * 1.4 - ri * 0.2, 0), 1);
            ctx.save();
            ctx.rotate(r.rot + t * 0.12 * (ri % 2 ? -1 : 1));
            ctx.strokeStyle = `rgba(${r.color},${0.45 * ringP})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.ellipse(0, 0, r.rx, r.ry, 0, 0, Math.PI * 2 * ringP);
            ctx.stroke();
            for (let n = 0; n < r.nodes; n++) {
              const a = (n / r.nodes) * Math.PI * 2 + t * r.speed;
              if (a % (Math.PI * 2) / (Math.PI * 2) > ringP && ringP < 1) continue;
              const x = Math.cos(a) * r.rx; const y = Math.sin(a) * r.ry;
              ctx.fillStyle = `rgba(${r.color},${0.95 * ringP})`;
              ctx.shadowColor = `rgb(${r.color})`; ctx.shadowBlur = 10;
              ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
              ctx.shadowBlur = 0;
            }
            ctx.restore();
          });

          ctx.fillStyle = `rgba(255,255,255,${0.95 * p})`;
          ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 24;
          ctx.beginPath(); ctx.arc(0, 0, 7 + Math.sin(t * 2.4) * 1.2 * p, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
          this.raf = requestAnimationFrame(frame);
        };
        this.raf = requestAnimationFrame(frame);
      });
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
