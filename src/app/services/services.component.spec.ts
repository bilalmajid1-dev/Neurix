import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ServicesComponent], providers: [provideRouter([]), provideNoopAnimations()] }));

  it('lists five verticals, each with six engineering items and an anchor id', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const arts = el.querySelectorAll('article.svc');
    expect(arts.length).toBe(5);
    expect(arts[0].id).toBe('web-platforms');
    expect(el.querySelectorAll('li.svc__item').length).toBe(30);
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('shows eight technologies and updates the detail panel on selection', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('button.tile').length).toBe(8);
    (el.querySelectorAll('button.tile')[3] as HTMLButtonElement).click(); // Go
    fixture.detectChanges();
    expect(el.querySelector('.detail__name')?.textContent).toContain('Go');
  });
});
