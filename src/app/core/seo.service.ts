import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SITE } from '../../systems.config';
import { SchemaKey, buildSchema } from './schema';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  schema: SchemaKey;
}

/** Per-route title, description, canonical, Open Graph, Twitter card and JSON-LD (SSR and prerender safe). */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly titleSvc = inject(Title);
  private readonly doc = inject(DOCUMENT);

  update(cfg: SeoConfig): void {
    const url = cfg.path === '/' ? `${SITE.url}/` : `${SITE.url}${cfg.path}`;
    const image = `${SITE.url}${SITE.ogImage}`;

    this.titleSvc.setTitle(cfg.title);

    const tags: Record<string, string>[] = [
      { name: 'description', content: cfg.description },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
      { property: 'og:site_name', content: SITE.legalName },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: cfg.title },
      { property: 'og:description', content: cfg.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${SITE.legalName}: ${SITE.tagline}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: cfg.title },
      { name: 'twitter:description', content: cfg.description },
      { name: 'twitter:image', content: image }
    ];
    tags.forEach(t => this.meta.updateTag(t));

    this.setCanonical(url);
    this.setJsonLd(buildSchema(cfg.schema, cfg.path, cfg.title, cfg.description));
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: object): void {
    this.doc.head.querySelectorAll('script[data-nx-ld]').forEach(n => n.remove());
    const script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-nx-ld', '');
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }
}
