import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('renders one h1, five verticals, six industries and the founder-led engagement model', () => {
    TestBed.configureTestingModule({ imports: [HomeComponent], providers: [provideRouter([]), provideNoopAnimations()] });
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('Enterprise Software Infrastructure');
    expect(el.querySelectorAll('article.vert').length).toBe(5);
    expect(el.querySelectorAll('.ind').length).toBe(6);
    expect(el.textContent).toContain('outsourced contractors');
  });
});
