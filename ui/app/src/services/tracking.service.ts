import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import { TRAFFIC_API_BASE_URL } from '../app/config';
import { CarSpeedDTO } from '../domain/model/car';
import { UserLocationDTO } from '../domain/model/userlocation';
import { Settings } from '../providers';

@Injectable()
export class TrackingService {

  lastTimeUserLocationSent: any = moment().subtract(60, 'seconds');
  allUserLocationsQueryInProgress: boolean = false;
  allUserLocationsCached: UserLocationDTO[];

  constructor(private http: Http, private settings: Settings) {
  }

  trackCarSpeed(dto: CarSpeedDTO): Observable<any> {
    return this.http.post(TRAFFIC_API_BASE_URL + '/carspeed/record', dto);
  }

  trackUserLocation(dto: UserLocationDTO): Observable<any> {
    if (!this.settings.allSettings[Settings.USER_GO_INVISIBLE]) {
      if (moment().diff(this.lastTimeUserLocationSent, 'seconds') > 60) { // 60 seconds dealy in case watchPosition event happends rapidly
        this.lastTimeUserLocationSent = moment();
        return this.http.post(TRAFFIC_API_BASE_URL + '/usertrack/save', dto);
      }
      else {
        return Observable.of(null);
      }
    }
    else {
      return Observable.of(null);
    }
  }

  allUserLocations(bounds: any): Observable<any> {
    if (!this.allUserLocationsQueryInProgress) {
      this.allUserLocationsQueryInProgress = true;
      let southWest = bounds._southWest.lat.toFixed(4) + ',' + bounds._southWest.lng.toFixed(4);  // Why 4? see https://en.wikipedia.org/wiki/Decimal_degrees precision section
      let northEast = bounds._northEast.lat.toFixed(4) + ',' + bounds._northEast.lng.toFixed(4);  // and because built url has more chance to HIT the cache server
      return this.http.get(TRAFFIC_API_BASE_URL + '/usertrack/query/' + southWest + '/' + northEast).map(res => {
        this.allUserLocationsQueryInProgress = false;
        this.allUserLocationsCached = res.json();
        return this.allUserLocationsCached;
      });
    }
    else {
      return Observable.of(this.allUserLocationsCached);
    }
  }

}