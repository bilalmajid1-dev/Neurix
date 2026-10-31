import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from '../../../systems.config';

/** Inline stroke icon set (no external assets). Size via CSS width/height; colour via currentColor. */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      @switch (name()) {
        @case ('eye') { <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/> }
        @case ('bot') { <rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V5"/><circle cx="12" cy="3.8" r="1.2"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/> }
        @case ('server') { <rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/> }
        @case ('layers') { <path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/> }
        @case ('chart') { <path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/> }
        @case ('shield') { <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/> }
        @case ('bolt') { <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/> }
        @case ('arrow') { <path d="M5 12h14M13 6l6 6-6 6"/> }
        @case ('arrow-up') { <path d="M12 19V5M6 11l6-6 6 6"/> }
        @case ('mail') { <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/> }
        @case ('pin') { <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/> }
        @case ('clock') { <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/> }
        @case ('check') { <path d="M5 12l5 5 9-10"/> }
        @case ('sun') { <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/> }
        @case ('chip') { <rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/> }
        @case ('lock') { <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 118 0v3"/> }
        @case ('database') { <ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/> }
        @case ('cube') { <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M12 12l9-5M12 12L3 7M12 12v10"/> }
        @case ('search') { <circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/> }
        @case ('rocket') { <path d="M12 3c4 2 6 6 6 10l-3 3H9l-3-3c0-4 2-8 6-10z"/><circle cx="12" cy="10" r="1.5"/><path d="M9 16l-2 5M15 16l2 5"/> }
        @case ('code') { <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/> }
        @case ('copy') { <rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/> }
        @case ('external') { <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/> }
        @case ('nodes') { <circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 12l10-6M7 12l10 6"/> }
        @case ('linkedin') { <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-2 4-2 4 0v3"/> }
        @case ('x') { <path d="M6 6l12 12M18 6L6 18"/> }
        @case ('menu') { <path d="M4 8h16M4 16h16"/> }
        @case ('file') { <path d="M7 3h7l5 5v13H7V3z"/><path d="M14 3v5h5"/> }
        @case ('target') { <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6"/> }
        @case ('brain') { <path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 0V4a3 3 0 00-3 0zM15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-6 0"/> }
        @case ('phone') { <rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/> }
        @case ('cart') { <circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.2a1 1 0 001 .8h9.2a1 1 0 001-.8L20 7H6"/> }
        @case ('truck') { <path d="M2 6h11v10H2z"/><path d="M13 9h4l3 3v4h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/> }
        @case ('bed') { <path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/> }
        @case ('bag') { <path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/> }
        @case ('cap') { <path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/> }
        @case ('pulse') { <path d="M3 12h4l2-6 4 12 2-6h6"/> }
        @case ('film') { <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3V9z"/> }
        @case ('users') { <circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M17 14c2.5 0 4.5 2 4.5 4.5"/> }
        @case ('link') { <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/> }
        @case ('globe') { <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/> }
        @case ('sync') { <path d="M20 11a8 8 0 00-14.5-3.5M4 13a8 8 0 0014.5 3.5"/><path d="M5 4v4h4M19 20v-4h-4"/> }
      }
    </svg>
  `,
  styles: [`:host { display: inline-flex; width: 1.25rem; height: 1.25rem; } svg { width: 100%; height: 100%; }`]
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
