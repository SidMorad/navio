import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import "rxjs/add/operator/map";

import { GEOCODING_API_BASE_URL } from '../app/config';

@Injectable()
export class GeocodingService {

  constructor(private http: Http, private translateService: TranslateService) {

  }

  geocode(address: string) {
    return this.http.get(GEOCODING_API_BASE_URL + "search?q=" + encodeURIComponent(address) +
     "&format=json&addressdetails=0&limit=10&countrycodes=ir&accept-language=" + this.translateService.currentLang)
       .map(res => res.json())
       .map(result => {
         if (!result) {
           throw new Error("unable to geocode address");
         }
         return result;
       });
  }

  geocodeByLatLng(latlng: any) {
    return this.http.get(GEOCODING_API_BASE_URL + "reverse?lat=" + latlng.lat + "&lon=" + latlng.lng +
    "&format=json&addressdetails=0&countrycodes=ir&accept-language=" + this.translateService.currentLang)
      .map(res => res.json())
      .map(result => {
        if (!result) {
          throw new Error("unable to geocode location(latlng)");
        }
        return result.display_name;
      });
  }

}