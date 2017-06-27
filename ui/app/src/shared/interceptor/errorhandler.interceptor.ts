import { ErrorHandler } from '@angular/core';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptor } from './jhipster/http.interceptor';

export class ErrorHandlerInterceptor extends HttpInterceptor {

  constructor(private errorHandler: ErrorHandler) {
    super();
  }

  requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
    return options;
  }

  responseIntercept(observable: Observable<Response>): Observable<Response> {
    return <Observable<Response>>observable.catch((error) => {
      if (!(error.status === 401 && (error.text() === '' ||
        (error.json().path && error.json().path.indexOf('/api/account') === 0)))) {
        this.errorHandler.handleError({ name: error.status, message: error });
      }
      return Observable.throw(error);
    });
  }

}