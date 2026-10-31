import { CASE_STUDIES, LEADERS, SERVICES, SITE } from '../../systems.config';

export type SchemaKey = 'home' | 'services' | 'cases' | 'about' | 'contact';

const ORG_ID = `${SITE.url}/#organization`;
const WEB_ID = `${SITE.url}/#website`;
const FOUNDER_ID = `${SITE.url}/about#wasiq-ali`;

const abs = (path: string): string => `${SITE.url}${path === '/' ? '/' : path}`;

function organization(): object {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.legalName,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}${SITE.ogImage}`,
    email: SITE.email,
    slogan: SITE.tagline,
    description: 'Technology partner engineering web platforms, mobile applications, custom systems, AI models and e-commerce / POS infrastructure.',
    address: { '@type': 'PostalAddress', addressLocality: SITE.locality, addressRegion: SITE.region, addressCountry: SITE.country },
    founder: { '@id': FOUNDER_ID },
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: SITE.email, availableLanguage: ['English'] },
    knowsAbout: ['Computer vision', 'Retrieval-augmented generation', 'Microservices', 'Point-of-sale systems', 'E-commerce platforms', 'Mobile applications', 'Kubernetes']
  };
}

function founder(): object {
  const p = LEADERS.primary;
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: p.name,
    jobTitle: 'Founder & CEO',
    worksFor: { '@id': ORG_ID },
    description: p.bio
  };
}

function website(): object {
  return { '@type': 'WebSite', '@id': WEB_ID, url: SITE.url, name: SITE.legalName, publisher: { '@id': ORG_ID }, inLanguage: 'en' };
}

function breadcrumb(name: string, path: string): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
      { '@type': 'ListItem', position: 2, name, item: abs(path) }
    ]
  };
}

function serviceList(): object[] {
  return SERVICES.map(s => ({
    '@type': 'Service',
    '@id': `${SITE.url}/services#${s.id}`,
    name: s.title,
    description: s.summary,
    serviceType: s.title,
    provider: { '@id': ORG_ID },
    url: `${SITE.url}/services#${s.id}`,
    areaServed: 'Worldwide'
  }));
}

/** Builds the JSON-LD @graph for a route. */
export function buildSchema(key: SchemaKey, path: string, name: string, description: string): object {
  const graph: object[] = [organization(), website()];

  switch (key) {
    case 'home':
      graph.push({ '@type': 'WebPage', '@id': `${abs('/')}#webpage`, url: abs('/'), name, description, isPartOf: { '@id': WEB_ID }, about: { '@id': ORG_ID } });
      graph.push(...serviceList());
      break;
    case 'services':
      graph.push({ '@type': 'CollectionPage', url: abs(path), name, description, isPartOf: { '@id': WEB_ID } }, breadcrumb(name, path), ...serviceList());
      break;
    case 'cases':
      graph.push(
        { '@type': 'CollectionPage', url: abs(path), name, description, isPartOf: { '@id': WEB_ID } },
        breadcrumb(name, path),
        {
          '@type': 'ItemList',
          itemListElement: CASE_STUDIES.map((c, i) => ({
            '@type': 'ListItem', position: i + 1,
            item: { '@type': 'CreativeWork', name: c.title, description: c.summary, about: c.industry, author: { '@id': ORG_ID } }
          }))
        }
      );
      break;
    case 'about':
      graph.push({ '@type': 'AboutPage', url: abs(path), name, description, isPartOf: { '@id': WEB_ID }, about: { '@id': ORG_ID } }, breadcrumb(name, path), founder());
      break;
    case 'contact':
      graph.push({ '@type': 'ContactPage', url: abs(path), name, description, isPartOf: { '@id': WEB_ID } }, breadcrumb(name, path));
      break;
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
