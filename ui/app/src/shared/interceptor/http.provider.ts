import { Injector, ErrorHandler } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { InterceptableHttp } from './jhipster/interceptable-http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthExpiredInterceptor } from './auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './errorhandler.interceptor';
import { NotificationInterceptor } from './notification.interceptor';
import { InMemoryStorage } from '../storage/in-memory-storage';

export function interceptableFactory(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
  inMemoryStorage: InMemoryStorage,
  injector: Injector,
  errorHandler: ErrorHandler
) {
  return new InterceptableHttp(
    backend,
    defaultOptions,
    [
      new AuthInterceptor(inMemoryStorage),
      new AuthExpiredInterceptor(injector),
      // Other interceptors can be added here
      new ErrorHandlerInterceptor(errorHandler),
      new NotificationInterceptor()
    ]
  );
};

export function customHttpProvider() {
  return {
    provide: Http,
    useFactory: (interceptableFactory),
    deps: [
      XHRBackend,
      RequestOptions,
      InMemoryStorage,
      Injector,
      ErrorHandler
    ]
  };
};