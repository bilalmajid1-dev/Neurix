import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredibilityModalComponent } from './credibility-modal.component';

describe('CredibilityModalComponent', () => {
  let component: CredibilityModalComponent;
  let fixture: ComponentFixture<CredibilityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredibilityModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredibilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
