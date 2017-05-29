import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import "rxjs/add/operator/map";

@Injectable()
export class GeocodingService {

  constructor(private http: Http) {

  }

  geocode(address: string) {
    return this.http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address))
       .map(res => res.json())
       .map(result => {
         console.log(result);
         if (result.status !== "OK") {
           throw new Error("unable to geocode address");
         }
         return result.results;
       });
  }

}