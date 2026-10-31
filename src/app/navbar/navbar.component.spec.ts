import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  it('renders every primary link', () => {
    TestBed.configureTestingModule({ imports: [NavbarComponent], providers: [provideRouter([]), provideNoopAnimations()] });
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('nav.links a').length).toBe(5);
  });
});
