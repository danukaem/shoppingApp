import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninUserComponent } from './signin-user.component';

describe('SigninUserComponent', () => {
  let component: SigninUserComponent;
  let fixture: ComponentFixture<SigninUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninUserComponent]
    });
    fixture = TestBed.createComponent(SigninUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
