import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { SITE } from '../systems.config';
import { SeoService } from './core/seo.service';
import { SchemaKey } from './core/schema';

const DEFAULT_TITLE = `${SITE.legalName} | ${SITE.tagline}`;
const DEFAULT_DESCRIPTION =
  'Neurix engineers web platforms, mobile applications, custom systems, AI models and e-commerce / POS infrastructure for logistics, hospitality, retail, edtech and healthcare.';

/** Route titles are complete page titles. Description and schema key come from `data` on each route. */
@Injectable({ providedIn: 'root' })
export class NeurixTitleStrategy extends TitleStrategy {
  private readonly seo = inject(SeoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route: ActivatedRouteSnapshot = snapshot.root;
    while (route.firstChild) route = route.firstChild;

    const path = snapshot.url.split(/[?#]/)[0] || '/';
    this.seo.update({
      title: this.buildTitle(snapshot) ?? DEFAULT_TITLE,
      description: (route.data?.['description'] as string | undefined) ?? DEFAULT_DESCRIPTION,
      path,
      schema: (route.data?.['schema'] as SchemaKey | undefined) ?? 'home'
    });
  }
}
