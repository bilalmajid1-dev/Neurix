import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: 'Neurix | AI Systems & Enterprise Software Engineering',
    data: {
      schema: 'home',
      description: 'Neurix engineers web platforms, mobile apps, custom AI models and e-commerce / POS systems for logistics, hospitality, retail, edtech and healthcare.'
    }
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.component').then(m => m.ServicesComponent),
    title: 'Engineering Services: Web, Mobile, AI, POS & Systems | Neurix',
    data: {
      schema: 'services',
      description: 'Five engineering verticals: web platforms, mobile apps, custom systems and DevOps, AI and RAG pipelines, and e-commerce with real-time multi-location POS sync.'
    }
  },
  {
    path: 'case-studies',
    loadComponent: () => import('./case-studies/case-studies.component').then(m => m.CaseStudiesComponent),
    title: 'Case Studies: Logistics AI, POS, E-commerce, Edtech | Neurix',
    data: {
      schema: 'cases',
      description: 'Production case studies: fleet audit AI (+45% efficiency), hospitality POS across 5+ locations, a custom e-commerce engine and an edtech SaaS.'
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
    title: 'About Neurix | Founder-Led Technology Partnership',
    data: {
      schema: 'about',
      description: 'A long-term technology partner, not an outsourced contractor. Meet founder and CEO Wasiq Ali and the team behind founder-to-founder engagements.'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Neurix | Start a Project',
    data: {
      schema: 'contact',
      description: 'Send a technical brief to the Neurix founders: project scope, budget range and requirements. Direct founder-to-founder dialogue and 24/7 deployment support.'
    }
  },
  // Legacy URLs from earlier versions of the portal
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'protocol', redirectTo: 'case-studies', pathMatch: 'full' },
  { path: 'about-us', redirectTo: 'about', pathMatch: 'full' },
  { path: 'contact-us', redirectTo: 'contact', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
