import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('shows the corporate email', () => {
    TestBed.configureTestingModule({ imports: [FooterComponent], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('corporate@neurix.pk');
  });
});
