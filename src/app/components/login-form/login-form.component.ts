import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Input() loginForm: FormGroup = new FormGroup({ });
  @Input() errors: string[] = [];
  @Output() onSubmit: EventEmitter<FormGroup> = new EventEmitter();
  
  submit() {
    this.onSubmit.emit(new FormGroup({
      email: new FormControl(this.loginForm.value.email),
      password: new FormControl(this.loginForm.value.password),
    }));
  }
}
