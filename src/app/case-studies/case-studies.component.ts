import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CASE_FILTERS, CASE_STUDIES, CaseCategory } from '../../systems.config';
import { REVEAL_ANIMATIONS, cardPresence } from '../core/animations';
import { GlowCardDirective } from '../core/glow-card.directive';
import { ParallaxDirective } from '../core/parallax.directive';
import { RevealDirective } from '../core/reveal.directive';
import { IconComponent } from '../shared/icon/icon.component';

type Filter = 'all' | CaseCategory;

@Component({
  selector: 'app-case-studies',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective, ParallaxDirective, GlowCardDirective],
  animations: [...REVEAL_ANIMATIONS, cardPresence],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.css'
})
export class CaseStudiesComponent {
  protected readonly filters = CASE_FILTERS;
  protected readonly active = signal<Filter>('all');
  protected readonly visible = computed(() => {
    const f = this.active();
    return f === 'all' ? CASE_STUDIES : CASE_STUDIES.filter(c => c.category === f);
  });

  protected setFilter(f: Filter): void { this.active.set(f); }
  protected count(f: Filter): number { return f === 'all' ? CASE_STUDIES.length : CASE_STUDIES.filter(c => c.category === f).length; }
}
