import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs, Response } from '@angular/http';

import { HttpInterceptor } from './jhipster/http.interceptor';
import { InMemoryStorage } from '../storage/in-memory-storage';

export class AuthInterceptor extends HttpInterceptor {

  constructor(private inMemoryStorage: InMemoryStorage) {
    super();
  }

  requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
    const token = this.inMemoryStorage.getValue(InMemoryStorage.AUTH_TOKEN_KEY);
    console.log("requestIntercept TOKEN: ", token);
    if (!!token) {
      options.headers.append('Authorization', 'Bearer ' + token);
    }
    return options;
  }

  responseIntercept(observable: Observable<Response>): Observable<Response> {
    return observable; // by pass
  }

}