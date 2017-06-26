import { LatLng } from './latlng';

export class AddressDTO {

  latlng: LatLng;
  name: string;
  details: { road: string, neighbourhood: string, suburb: string, city: string,
             county: string, state: string, country: string, country_code: string,
             postcode: string };
  favLabel: string;

  constructor(latlng: LatLng, address: string) {
    this.name = address;
    this.latlng = new LatLng(latlng.lat, latlng.lng);
  }

  static toDTO(nominatimArrayResponse: any[]): AddressDTO[] {
    var result = [];
    for (let obj of nominatimArrayResponse) {
      result.push(new AddressDTO(new LatLng(obj.lat, obj.lon), obj.display_name));
    }
    return result;
  }

  setDetails(details: any) {
    this.details = details;
  }

  get shortName() {
    if (this.favLabel) {
      return this.favLabel;
    }
    else {
      return this.details.road + ' - ' + this.details.neighbourhood;
    }
  }

  get shortAreaName() {
    return this.details.suburb + ' - ' + this.details.city;
  }

}