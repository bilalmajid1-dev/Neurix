import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CaseStudiesComponent } from './case-studies.component';

describe('CaseStudiesComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [CaseStudiesComponent], providers: [provideRouter([]), provideNoopAnimations()] }));

  it('shows all six case studies with anchor ids by default', () => {
    const fixture = TestBed.createComponent(CaseStudiesComponent);
    fixture.detectChanges();
    const arts = fixture.nativeElement.querySelectorAll('article.case');
    expect(arts.length).toBe(6);
    expect(arts[0].id).toBe('fleet-logistics-audit-ai');
  });

  it('filters by category', async () => {
    const fixture = TestBed.createComponent(CaseStudiesComponent);
    fixture.detectChanges();
    const tabs = fixture.nativeElement.querySelectorAll('button.tab') as NodeListOf<HTMLButtonElement>;
    tabs[3].click(); // Commerce & POS
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article.case').length).toBe(2);
  });

  it('contains the fleet audit metrics', () => {
    const fixture = TestBed.createComponent(CaseStudiesComponent);
    fixture.detectChanges();
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('+45%');
    expect(text).toContain('-60ms');
  });
});
