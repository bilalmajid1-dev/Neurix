import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ContactComponent], providers: [provideRouter([]), provideNoopAnimations()] }));

  it('shows the corporate email, 24/7 support and the five intake fields', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('corporate@neurix.pk');
    expect(el.textContent).toContain('24/7 Deployment Support');
    expect(el.querySelector('address')).toBeTruthy();
    ['f-name', 'f-email', 'f-scope', 'f-budget', 'f-brief'].forEach(id => expect(el.querySelector('#' + id)).toBeTruthy());
  });

  it('offers the five service verticals as project scopes', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const opts = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('#f-scope option')).map(o => o.textContent);
    expect(opts.join('|')).toContain('E-commerce / POS Integration');
    expect(opts.join('|')).toContain('Custom AI Model / RAG Pipeline');
  });

  it('blocks submission and shows errors when the form is empty', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(el.querySelectorAll('.err').length).toBe(5);
  });
});
