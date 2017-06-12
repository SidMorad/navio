
export class AddressDTO {

  lat: number;
  lng: number;
  name: string;

  constructor(nominatimResponse: any) {
    this.name = nominatimResponse.display_name;
    this.lat = +nominatimResponse.lat;
    this.lng = +nominatimResponse.lon;
  }

  static toDTO(nominatimArrayResponse: any[]): AddressDTO[] {
    var result = [];
    for (let obj of nominatimArrayResponse) {
      result.push(new AddressDTO(obj));
    }
    return result;
  }

  get latlng() {
    return { lat: this.lat, lng: this.lng };
  }

}