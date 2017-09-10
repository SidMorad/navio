import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AUTH_API_BASE_URL } from '../../app/config';
import { InMemoryStorage } from '../storage/in-memory-storage';

@Injectable()
export class AuthServerProvider {

  constructor(
    private http: Http,
    private inMemoryStorage: InMemoryStorage
  ) { }

  getToken() {
    return this.inMemoryStorage.getValue(InMemoryStorage.AUTH_TOKEN_KEY);
  }

  login(credentials): Observable<any> {
    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', credentials.username);
    data.append('password', credentials.password);

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic d2ViX2FwcDo='
    });

    return this.http.post(AUTH_API_BASE_URL + '/oauth/token', data, {
      headers
    }).map((resp) => {
      const accessToken = resp.json()['access_token'];
      if (accessToken) {
        this.storeAuthenticationToken(accessToken, credentials.rememberMe);
      }

      return accessToken;
    });
  }

  loginWithToken(jwt, rememberMe) {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      this.inMemoryStorage.setValue(InMemoryStorage.AUTH_TOKEN_KEY, jwt, true);
    } else {
      this.inMemoryStorage.setValue(InMemoryStorage.AUTH_TOKEN_KEY, jwt, false);
    }
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      this.inMemoryStorage.clear(InMemoryStorage.AUTH_TOKEN_KEY, true);
      observer.complete();
    });
  }

}