import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AboutComponent], providers: [provideRouter([]), provideNoopAnimations()] }));

  it('features Wasiq Ali with his exact roles and disciplines', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Wasiq Ali');
    expect(text).toContain('Founder & CEO, Neurix (Pvt) Ltd.');
    expect(text).toContain('Founder & CEO, Grapes Creative');
    expect(text).toContain('Director IT, Megatronics Engineering');
    expect(text).toContain('Growth Strategist');
    expect(text).toContain('Full Stack Software Engineer & Consultant');
    expect(text).toContain('Visual Communication Designer');
  });

  it('states the partnership model and compares it with outsourced vendors', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('outsourced contractors who disappear after code handoff');
    expect(el.textContent).toContain('founder-to-founder');
    expect(el.querySelectorAll('.cmp tbody tr').length).toBe(6);
    expect(el.querySelectorAll('h1').length).toBe(1);
  });
});
