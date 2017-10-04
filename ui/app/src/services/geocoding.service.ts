import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import "rxjs/add/operator/map";

import { GEOCODING_API_BASE_URL } from '../app/config';
import { AddressDTO } from '../domain/model/geocoding';
import { Settings } from '../providers/settings';

@Injectable()
export class GeocodingService {

  searchInProgress: boolean = false;

  constructor(private http: Http, private translateService: TranslateService,
              private settings: Settings) {
  }

  search(address: string): Observable<AddressDTO[]> {
    this.searchInProgress = true;
    if (address.trim() === "") {
      this.searchInProgress = false;
      return Observable.of([]);
    }
    return this.http.get(GEOCODING_API_BASE_URL + "search?street=" + encodeURIComponent(address) +
     "&format=json&addressdetails=0&limit=5&countrycodes=ir&accept-language=" + this.acceptLanugage(address) + this.resolveState())
       .map(res => res.json())
       .map(result => {
         if (!result) {
           throw new Error("unable to geocode address");
         }
         this.searchInProgress = false;
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

  resolveState(): string {
    if (this.settings.getValue(Settings.CITY) === 'THR') {
      return '&state=tehran';
    }
    return '';
  }

  acceptLanugage(term):string {
    let currentLang = this.translateService.currentLang;
    if (currentLang === 'fa' || currentLang === 'en') {
      if (this.isASCII(term)) {
        return 'en';
      }
      else {
        return 'fa';
      }
    }
    else {
      return currentLang;
    }
  }

  isASCII(str):boolean {
    return /^[\x00-\x7F]*$/.test(str);
  }

}