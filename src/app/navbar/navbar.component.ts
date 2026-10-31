import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, NgZone, OnDestroy, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { NAV_LINKS, SITE } from '../../systems.config';
import { menuPanel } from '../core/animations';
import { SmoothScrollService } from '../core/smooth-scroll.service';
import { UiStateService } from '../core/ui-state.service';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, IconComponent,NgOptimizedImage],
  animations: [menuPanel],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {
  protected readonly links = NAV_LINKS;
  protected readonly site = SITE;
  protected readonly scrolled = signal(false);
  protected readonly ui = inject(UiStateService);

  private readonly zone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly smooth = inject(SmoothScrollService);
  private win?: Window;

  constructor() {
    afterNextRender(() => {
      this.win = this.doc.defaultView as Window;
      this.zone.runOutsideAngular(() => this.win!.addEventListener('scroll', this.onScroll, { passive: true }));
      this.onScroll();
    });
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.close());
  }

  private onScroll = (): void => {
    const next = (this.win as Window).scrollY > 24;
    if (next !== this.scrolled()) this.zone.run(() => this.scrolled.set(next));
  };

  protected toggle(): void { this.ui.menuOpen() ? this.close() : this.open(); }

  private open(): void { this.ui.menuOpen.set(true); this.smooth.stop(); }

  protected close(): void {
    if (!this.ui.menuOpen()) return;
    this.ui.menuOpen.set(false);
    this.smooth.start();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void { this.close(); }

  ngOnDestroy(): void { this.win?.removeEventListener('scroll', this.onScroll); }
}
