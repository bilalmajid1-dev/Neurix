import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { INFRA, LEADERS, MISSION, PARTNERSHIP, PRINCIPLES, SITE } from '../../systems.config';
import { REVEAL_ANIMATIONS } from '../core/animations';
import { GlowCardDirective } from '../core/glow-card.directive';
import { ParallaxDirective } from '../core/parallax.directive';
import { RevealDirective } from '../core/reveal.directive';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective, ParallaxDirective, GlowCardDirective],
  animations: REVEAL_ANIMATIONS,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  protected readonly mission = MISSION;
  protected readonly partnership = PARTNERSHIP;
  protected readonly principles = PRINCIPLES;
  protected readonly lead = LEADERS.primary;
  protected readonly coLead = LEADERS.secondary;
  protected readonly infra = INFRA;
  protected readonly site = SITE;
}
