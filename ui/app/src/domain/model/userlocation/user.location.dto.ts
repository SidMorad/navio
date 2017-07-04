import { LatLng } from '../geocoding';

export class UserLocationDTO {

  latitude: number;
  longitude: number;
  mobileId: string;
  userId: string;

  static toDTO(geolocationCoords: any): UserLocationDTO {
    let dto = new UserLocationDTO();
    dto.latitude = geolocationCoords.latitude;
    dto.longitude = geolocationCoords.longitude;
    return dto;
  }

  get latLng(): LatLng {
    return new LatLng(this.latitude + '', this.longitude + '');
  }

}