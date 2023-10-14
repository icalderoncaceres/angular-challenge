import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errors: string[] = [];
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  constructor(
    private auth: AuthService
  ) {}

  onSubmit() {
    console.log(this.loginForm.value);
    this.errors = [];


    if (!this.loginForm.valid) {
      return;
    }

    const response = this.auth.signIn({
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    });

    if (response.status === 401) {
      this.errors = ['User or password incorrect'];
      return;
    }

    localStorage.setItem("user", this.loginForm.value.email || '');
    location.href = '/';
  }
}
