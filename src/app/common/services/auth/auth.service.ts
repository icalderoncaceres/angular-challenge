import { Injectable } from '@angular/core';
import { ILogin, ISiginResponse } from 'src/app/common/models/loginModel.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signIn(login: ILogin): ISiginResponse {
    if (login.email === 'blockedUser@mail.com') {
      return {
        status: 401
      }
    }
    return {
      status: 200
    }
  }

  signUp() {
    localStorage.removeItem("user");
    document.location.href = 'login';
  }

  get() {
    const user = localStorage.getItem("user");
    return user ? user : 'Not Authenticated'
  }
}
