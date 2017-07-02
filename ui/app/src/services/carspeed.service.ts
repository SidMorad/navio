import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TRAFFIC_API_BASE_URL } from '../app/config';
import { CarSpeedDTO } from '../domain/model/car';

@Injectable()
export class CarSpeedService {

  constructor(private http: Http) {
  }

  save(coords: CarSpeedDTO): Observable<any> {
    return this.http.post(TRAFFIC_API_BASE_URL + '/carspeed/record', coords);
  }

}