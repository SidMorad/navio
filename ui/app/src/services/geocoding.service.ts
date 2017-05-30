import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

import { GEOCODING_API_BASE_URL } from '../app/config';

@Injectable()
export class GeocodingService {

  constructor(private http: Http) {

  }

  geocode(address: string) {
    return this.http.get(GEOCODING_API_BASE_URL + "/json?address=" + encodeURIComponent(address))
       .map(res => res.json())
       .map(result => {
         if (result.status !== "OK") {
           throw new Error("unable to geocode address");
         }
         return result.results;
       });
  }

  geocodeByLatLng(latlng: any) {
    return this.http.get(GEOCODING_API_BASE_URL + "/json?latlng=" + latlng.lat + "," + latlng.lng)
      .map(res => res.json())
      .map(result => {
        if (result.status !== "OK") {
          throw new Error("unable to geocode location(latlng)");
        }
        return result.results;
      });
  }

}