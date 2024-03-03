import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuperAdminComponent } from './register-super-admin.component';

describe('RegisterSuperAdminComponent', () => {
  let component: RegisterSuperAdminComponent;
  let fixture: ComponentFixture<RegisterSuperAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSuperAdminComponent]
    });
    fixture = TestBed.createComponent(RegisterSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
