import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AUTH_API_BASE_URL } from '../../app/config';

@Injectable()
export class AccountService {
  constructor(private http: Http) { }

  get(): Observable<any> {
    return this.http.get(AUTH_API_BASE_URL + '/api/account').map((res: Response) => res.json());
  }

  save(account: any): Observable<Response> {
    return this.http.post(AUTH_API_BASE_URL + '/api/account', account);
  }

}