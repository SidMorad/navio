
export class CarSpeedDTO {

  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  accuracy: number;

  static toDTO(geolocationCoords: any): CarSpeedDTO {
    let dto = new CarSpeedDTO();
    dto.latitude = geolocationCoords.latitude;
    dto.longitude = geolocationCoords.longitude;
    dto.speed = geolocationCoords.speed;
    dto.heading = geolocationCoords.heading;
    dto.accuracy = geolocationCoords.accuracy;
    return dto;
  }

}