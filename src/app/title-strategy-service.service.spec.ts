import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NeurixTitleStrategy } from './title-strategy-service.service';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('NeurixTitleStrategy + SeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'x', component: DummyComponent, title: 'Services Page', data: { description: 'Desc here', schema: 'services' } }]),
        { provide: TitleStrategy, useClass: NeurixTitleStrategy }
      ]
    });
  });

  it('sets title, description, canonical, Open Graph and JSON-LD for the route', async () => {
    await TestBed.inject(Router).navigateByUrl('/x');
    const doc = TestBed.inject(DOCUMENT);
    expect(TestBed.inject(Title).getTitle()).toBe('Services Page');
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe('Desc here');
    expect(TestBed.inject(Meta).getTag('property="og:url"')?.content).toBe('https://neurix.pk/x');
    expect(doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://neurix.pk/x');
    const ld = doc.head.querySelector('script[data-nx-ld]')?.textContent ?? '';
    expect(JSON.parse(ld)['@graph'].some((n: { '@type': string }) => n['@type'] === 'Organization')).toBeTrue();
  });

  it('keeps a single JSON-LD block across navigations', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/x');
    await router.navigateByUrl('/x?y=1');
    expect(TestBed.inject(DOCUMENT).head.querySelectorAll('script[data-nx-ld]').length).toBe(1);
  });
});
