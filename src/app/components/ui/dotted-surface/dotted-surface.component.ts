import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, ViewChild, afterNextRender, inject } from '@angular/core';

/**
 * Global ambient backdrop:
 *  1. Two drifting radial light spheres (Electric Cyan + Hyper Purple) behind all glass cards.
 *  2. A subtle dot grid that lights up (cyan -> purple) around the pointer.
 * Pauses when the tab is hidden; renders a single static frame for reduced-motion users.
 */
@Component({
  selector: 'app-dotted-surface',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  templateUrl: './dotted-surface.component.html',
  styleUrl: './dotted-surface.component.css'
})
export class DottedSurfaceComponent implements OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);

  private win!: Window;
  private ctx!: CanvasRenderingContext2D;
  private raf = 0;
  private w = 0; private h = 0; private dpr = 1;
  private gap = 44;
  private mx = -9999; private my = -9999;
  private px = -9999; private py = -9999;
  private reduced = false;
  private running = false;

  constructor() {
    afterNextRender(() => {
      this.win = this.doc.defaultView as Window;
      const ctx = this.canvasRef.nativeElement.getContext('2d');
      if (!ctx) return;
      this.ctx = ctx;
      this.reduced = this.win.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.resize();
      this.zone.runOutsideAngular(() => {
        this.win.addEventListener('resize', this.onResize, { passive: true });
        this.win.addEventListener('mousemove', this.onMove, { passive: true });
        this.doc.addEventListener('visibilitychange', this.onVisibility);
        this.start();
      });
    });
  }

  private onResize = (): void => { this.resize(); if (!this.running) this.draw(0); };
  private onMove = (e: MouseEvent): void => { this.mx = e.clientX; this.my = e.clientY; };
  private onVisibility = (): void => { this.doc.hidden ? this.stop() : this.start(); };

  private resize(): void {
    const c = this.canvasRef.nativeElement;
    this.dpr = Math.min(this.win.devicePixelRatio || 1, 2);
    this.w = this.win.innerWidth;
    this.h = this.win.innerHeight;
    this.gap = this.w < 640 ? 38 : this.w < 1280 ? 44 : 52;
    c.width = Math.floor(this.w * this.dpr);
    c.height = Math.floor(this.h * this.dpr);
    c.style.width = `${this.w}px`;
    c.style.height = `${this.h}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private start(): void {
    if (this.running) return;
    if (this.reduced) { this.draw(0); return; }
    this.running = true;
    const loop = (t: number) => {
      if (!this.running) return;
      this.draw(t / 1000);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private stop(): void {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private draw(time: number): void {
    const { ctx, w, h, gap } = this;
    ctx.clearRect(0, 0, w, h);
    // Ease the light toward the pointer for a soft, trailing reveal.
    this.px += (this.mx - this.px) * 0.12;
    this.py += (this.my - this.py) * 0.12;

    const radius = 190;
    const cols = Math.ceil(w / gap) + 1;
    const rows = Math.ceil(h / gap) + 1;
    const offX = (w - (cols - 1) * gap) / 2;
    const offY = (h - (rows - 1) * gap) / 2;

    // Idle dots batched into one path.
    ctx.beginPath();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = offX + i * gap;
        const y = offY + j * gap;
        const dx = x - this.px; const dy = y - this.py;
        if (dx * dx + dy * dy < radius * radius) continue;
        const wave = this.reduced ? 0 : Math.sin(time * 0.6 + i * 0.35 + j * 0.28) * 0.5 + 0.5;
        const r = 0.9 + wave * 0.35;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
    }
    ctx.fillStyle = 'rgba(160, 174, 192, 0.17)';
    ctx.fill();

    // Dots near the pointer, individually coloured.
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = offX + i * gap;
        const y = offY + j * gap;
        const dx = x - this.px; const dy = y - this.py;
        const d2 = dx * dx + dy * dy;
        if (d2 >= radius * radius) continue;
        const k = 1 - Math.sqrt(d2) / radius;
        const mix = Math.min(1, (x / w) * 0.6 + k * 0.5);
        const cr = Math.round(0 + 139 * mix);
        const cg = Math.round(229 * (1 - mix));
        ctx.beginPath();
        ctx.arc(x, y, 1 + k * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, 255, ${0.25 + k * 0.7})`;
        ctx.fill();
      }
    }
  }

  ngOnDestroy(): void {
    this.stop();
    if (!this.win) return;
    this.win.removeEventListener('resize', this.onResize);
    this.win.removeEventListener('mousemove', this.onMove);
    this.doc.removeEventListener('visibilitychange', this.onVisibility);
  }
}
