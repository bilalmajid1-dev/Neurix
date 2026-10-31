import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CASE_STUDIES, HERO, INDUSTRIES, METRICS, PARTNERSHIP, PROCESS, SERVICES, SITE } from '../../systems.config';
import { REVEAL_ANIMATIONS } from '../core/animations';
import { GlowCardDirective } from '../core/glow-card.directive';
import { ParallaxDirective } from '../core/parallax.directive';
import { RevealDirective } from '../core/reveal.directive';
import { IconComponent } from '../shared/icon/icon.component';
import { PipelineCardComponent } from './pipeline-card/pipeline-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective, ParallaxDirective, GlowCardDirective, PipelineCardComponent],
  animations: REVEAL_ANIMATIONS,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected readonly hero = HERO;
  protected readonly metrics = METRICS;
  protected readonly services = SERVICES;
  protected readonly industries = INDUSTRIES;
  protected readonly process = PROCESS;
  protected readonly partnership = PARTNERSHIP;
  protected readonly proof = CASE_STUDIES.filter(c => c.featured);
  protected readonly site = SITE;
}
