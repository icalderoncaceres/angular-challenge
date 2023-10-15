import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, RouterModule } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth.guard';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

describe('authGuard with localStorage not empty', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAuthenticatedGuard(...guardParameters));

  const executeGuard2: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotAuthenticatedGuard(...guardParameters));
  let localStore: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(
          [{path: '', component: HomeComponent}, {path: 'login', component: LoginComponent}]
        )
      ]
    });
    localStore = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) => 'ivan@mail.com');
  });

  it('should be created isAuthenticatedGuard', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should be created isNotAuthenticatedGuard', () => {
    expect(executeGuard2).toBeTruthy();
  });  

  it('Should return true for isAuthenticatedGuard', () => {
    const urlPath = 'login';
    const dummyRoute: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    const dummyState: RouterStateSnapshot = { url: urlPath, root:  dummyRoute }
    const result = isAuthenticatedGuard(dummyRoute, dummyState);
    expect(result).toBeTruthy();
  });

  xit('Should return false for isNotAuthenticatedGuard', () => {
    const urlPath = 'login';
    const dummyRoute: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    const dummyState: RouterStateSnapshot = { url: urlPath, root:  dummyRoute }
    const result = isNotAuthenticatedGuard(dummyRoute, dummyState);
    expect(result).toBeFalsy();
  });

});

describe('authGuard with localStorage empty', () => {

  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotAuthenticatedGuard(...guardParameters));
  const executeGuard2: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotAuthenticatedGuard(...guardParameters));

  let localStore: any;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(
          [{path: '', component: HomeComponent}, {path: 'login', component: LoginComponent}]
        )
      ],
      providers: [
        {provide: Router, useValue: routerSpy}
      ]
    });
    localStore = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) => null);
  });

  it('should be created isAuthenticatedGuard', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should be created isNotAuthenticatedGuard', () => {
    expect(executeGuard2).toBeTruthy();
  }); 

  xit('Should return false for isAuthenticatedGuard', () => {
    const urlPath = 'login';
    const dummyRoute: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    const dummyState: RouterStateSnapshot = { url: urlPath, root:  dummyRoute }
    const result = isAuthenticatedGuard(dummyRoute, dummyState);
    expect(result).toBeFalsy();
  });

  it('Should return true for isNotAuthenticatedGuard', () => {
    const urlPath = 'login';
    const dummyRoute: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    const dummyState: RouterStateSnapshot = { url: urlPath, root:  dummyRoute }
    const result = isNotAuthenticatedGuard(dummyRoute, dummyState);
    expect(result).toBeTruthy();
  });  

});
