import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AUTH_API_BASE_URL } from '../app/config';

@Injectable()
export class SignupService {

  constructor(private http: Http) {
  }

  save(account: any) {
    return this.http.post(AUTH_API_BASE_URL + '/api/register', account);
  }

}