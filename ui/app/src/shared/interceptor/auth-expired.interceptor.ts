import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';
import { HttpInterceptor } from './jhipster/http.interceptor';
import { LoginService } from '../../shared/login/login.service';

export class AuthExpiredInterceptor extends HttpInterceptor {

  constructor(private injector: Injector) {
    super();
  }

  requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
    return options;
  }

  responseIntercept(observable: Observable<Response>): Observable<Response> {
    return <Observable<Response>>observable.catch((error, source) => {
//      console.log("AuthExpiredInterceptor, error ",error, " source ", source);
      if (error.status === 401) {
        const loginService: LoginService = this.injector.get(LoginService);
        loginService.logout();
      }
      return Observable.throw(error);
    });
  }

}