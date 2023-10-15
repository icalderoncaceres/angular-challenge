import { Injectable } from '@angular/core';
import { ILogin, ISiginResponse } from 'src/app/common/models/loginModel.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  signIn(login: ILogin): ISiginResponse {
    if (login.email === 'blockedUser@mail.com') {
      return {
        status: 401
      }
    }
    localStorage.setItem('user',login.email);
    this.router.navigate(['']);
    return {
      status: 200
    }
  }

  signOut() {
    localStorage.removeItem("user");
    this.router.navigate(['login'])
  }

  get() {
    const user = localStorage.getItem("user");
    return user ? user : 'Not Authenticated'
  }
}
