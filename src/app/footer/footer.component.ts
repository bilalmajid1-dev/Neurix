import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_LINKS, SERVICES, SITE } from '../../systems.config';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly services = SERVICES;
  protected readonly year = new Date().getFullYear();
}
