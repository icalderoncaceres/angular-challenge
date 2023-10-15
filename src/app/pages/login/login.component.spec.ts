import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

  const authServiceSpy = jasmine.createSpyObj('AuthService',['signIn']);
  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, usValue: authServiceSpy}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      el = fixture.debugElement;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call onSubmit without email and show two errors', () => {
    component.onSubmit();
    fixture.detectChanges();
    const matErrors = el.queryAll(By.css(".mat-mdc-form-field-subscript-wrapper"));
    expect(matErrors).toBeDefined();
    expect(matErrors.length).toBe(2);
  });

  xit('Should call onSubmit with email but without password and show 1 error', () => {
    component.loginForm.setValue({ email: 'ivan@mail.com', password: null});
    component.onSubmit();
    fixture.detectChanges();
    const matErrors = el.queryAll(By.css(".mat-mdc-form-field-error"));
    expect(matErrors).toBeDefined();
    expect(matErrors.length).toBe(1);
  });

  it('Should call signIn method', () => {
    component.loginForm.setValue({ email: 'ivan@mail.com', password: '123456'});
    authServiceSpy.signIn = () => {
      return {
        status: 401
      }
    }
    component.onSubmit();
    fixture.detectChanges();
    expect(component.errors.length).toBe(0);
  });
});
