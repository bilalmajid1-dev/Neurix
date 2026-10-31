import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SERVICES, TARGETS, TECH_STACK } from '../../systems.config';
import { REVEAL_ANIMATIONS, detailChange } from '../core/animations';
import { GlowCardDirective } from '../core/glow-card.directive';
import { ParallaxDirective } from '../core/parallax.directive';
import { RevealDirective } from '../core/reveal.directive';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective, ParallaxDirective, GlowCardDirective],
  animations: [...REVEAL_ANIMATIONS, detailChange],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  protected readonly services = SERVICES;
  protected readonly targets = TARGETS;
  protected readonly tech = TECH_STACK;
  protected readonly selectedId = signal(TECH_STACK[0].id);
  protected readonly selected = computed(() => TECH_STACK.find(t => t.id === this.selectedId()) ?? TECH_STACK[0]);

  protected select(id: string): void { this.selectedId.set(id); }
}
