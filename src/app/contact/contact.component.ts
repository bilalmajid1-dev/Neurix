import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CONTACT_STEPS, SITE } from '../../systems.config';
import { REVEAL_ANIMATIONS } from '../core/animations';
import { GlowCardDirective } from '../core/glow-card.directive';
import { ParallaxDirective } from '../core/parallax.directive';
import { RevealDirective } from '../core/reveal.directive';
import { IconComponent } from '../shared/icon/icon.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective, ParallaxDirective, GlowCardDirective, ContactFormComponent],
  animations: REVEAL_ANIMATIONS,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  protected readonly site = SITE;
  protected readonly steps = CONTACT_STEPS;
}
