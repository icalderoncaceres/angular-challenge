import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

describe('AuthService', () => {
  let service: AuthService;
  let localStore: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(
          [{path: '', component: HomeComponent}, {path: 'login', component: LoginComponent}]
        )
      ],
    });
    service = TestBed.inject(AuthService);
    spyOn(window.localStorage, 'removeItem').and.callFake((key) => (localStore = {}));
    spyOn(window.localStorage, 'getItem').and.callFake((key) => localStore[key] ? localStore[key] : null);
    spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (localStore[key] = value));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /****************** SIGNIN *************************************/
  it('Should call signIn function and return status 200', () => {
    const response = service.signIn({
      email: 'user@mail.com',
      password: 'abcdef'
    });

    expect(response).toBeTruthy();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);
  });

  it('Should call signIn function and return status 401', () => {
    const response = service.signIn({
      email: 'blockedUser@mail.com',
      password: 'abcdef'
    });

    expect(response).toBeTruthy();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(401);   
  });

  /**************** SIGNOUT ******************************/

  it('Should call signOut function', () => {
    const result = service.signOut();
    const user = service.get();
    expect(user).toBe('Not Authenticated');
  })

  /**************** GET *********************************/
  it('Should return user@mail.com', () => {
    service.signIn({
      email: 'user@mail.com',
      password: 'abcdef'
    });

    const result = service.get();
    expect(result).toEqual('user@mail.com');
  });
});
