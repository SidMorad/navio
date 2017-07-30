import intersect from '@turf/intersect';
import { polygon } from '@turf/helpers';
import 'leaflet';

export class GeoUtil {

  static intersectPolygon(points1: any[], points2: any[]): boolean {
    return intersect(polygon([points1]), polygon([points2])) != null;
  }

  static intersectRect(points1: any[], points2: any[]): boolean {
    let corner1_1 = L.latLng(points1[0][0], points1[0][1]);
    let corner1_2 = L.latLng(points1[1][0], points1[1][1]);
    let corner2_1 = L.latLng(points2[0][0], points2[0][1]);
    let corner2_2 = L.latLng(points2[1][0], points2[1][1]);
    return L.latLngBounds(corner1_1, corner1_2).intersects(L.latLngBounds(corner2_1, corner2_2));
  }

  static aPolygonWithTwoPoints(point1, point2): any[] {
    let bounds = L.latLngBounds(L.latLng(point1[0], point1[1]), L.latLng(point2[0], point2[1]));
    let center = bounds.getCenter();
    let points = [];

    points.push([bounds.getSouthWest().lat, bounds.getSouthWest().lng]);  //bottom left
    points.push([bounds.getSouth(), center.lng]);                         //bottom center
    points.push([bounds.getSouthEast().lat, bounds.getSouthEast().lng]);  //bottom right
    points.push([center.lat, bounds.getEast()]);                          //center right
    points.push([bounds.getNorthEast().lat, bounds.getNorthEast().lng]);  //top right
    points.push([bounds.getNorth(), center.lng]);                         //top center
    points.push([bounds.getNorthWest().lat, bounds.getNorthWest().lng]);  //top left
    points.push([center.lat, bounds.getWest()]);                          //center left

    points.push([bounds.getSouthWest().lat, bounds.getSouthWest().lng]);  // Last and first points must be equivalent.
    return points;
  }

}