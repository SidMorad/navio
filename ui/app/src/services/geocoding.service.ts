import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import "rxjs/add/operator/map";

import { GEOCODING_API_BASE_URL } from '../app/config';
import { AddressDTO } from '../domain/model/geocoding';

@Injectable()
export class GeocodingService {

  constructor(private http: Http, private translateService: TranslateService) {

  }

  search(address: string): Observable<AddressDTO[]> {
    return this.http.get(GEOCODING_API_BASE_URL + "search?q=" + encodeURIComponent(address) +
     "&format=json&addressdetails=0&limit=10&countrycodes=ir&accept-language=" + this.translateService.currentLang)
       .map(res => res.json())
       .map(result => {
         if (!result) {
           throw new Error("unable to geocode address");
         }
         return AddressDTO.toDTO(result);
       });
  }

  reverse(latlng: any, zoomLevel: any): Observable<AddressDTO> {
    return this.http.get(GEOCODING_API_BASE_URL + "reverse?lat=" + latlng.lat + "&lon=" + latlng.lng +
    "&format=json&addressdetails=1&countrycodes=ir&accept-language=" + this.translateService.currentLang +
    "&zoom=" + zoomLevel)
      .map(res => res.json())
      .map(result => {
        if (!result) {
          throw new Error("unable to reverse geocode address");
        }
        let address = new AddressDTO(latlng, result.display_name);
        address.setDetails(result.address);
        return address;
      });
  }

}