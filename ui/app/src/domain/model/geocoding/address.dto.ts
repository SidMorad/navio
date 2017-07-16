import { LatLng } from './latlng';

export class AddressDTO {

  latlng: LatLng;
  name: string;
  details: { road: string, neighbourhood: string, suburb: string, city: string,
             county: string, state: string, country: string, country_code: string,
             postcode: string };
  favLabel: string;
  shortName: string;
  shortAreaName: string;

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
    this.resolveShortName();
    this.resolveShortAreaName();
  }

  detailOrder: string[] = [
    'road', 'neighbourhood', 'suburb', 'city', 'county', 'state', 'country', 'postcode'
  ];

  resolveShortName() {
    if (this.favLabel) {
      this.shortName = this.favLabel;
    }
    else {
      let counter = 0;
      this.shortName = '';
      this.detailOrder.forEach(name => {
        if (this.details[name] && counter < 2) {
          this.shortName += this.details[name] + ((counter === 0) ? ' - ' : '');
          counter++;
        }
      });
    }
  }

  resolveShortAreaName() {
    let counter = 0;
    this.shortAreaName = '';
    this.detailOrder.forEach(name => {
      if (this.details[name]) {
        counter++;
        if (counter > 2 && counter < 5) {
          this.shortAreaName += this.details[name] + ((counter === 3) ? ' - ' : '');
        }
      }
    });
  }

}