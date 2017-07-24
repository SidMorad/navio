import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Settings } from './';

@Injectable()
export class OverpassUtil implements OnInit {

  overpassShowSpeedCamera: boolean;
  overpassShowFuelStation: boolean;
  overpassShowTrafficLight: boolean;
  onOverpassSettingsChangeEvent = new EventEmitter();

  constructor(private settings: Settings) {
    settings.onSettingsChangeEvent.subscribe(() => {
      if (this.overpassShowSpeedCamera != settings.allSettings[Settings.OVERPASS_SHOW_SPEED_CAMERA]) {
        this.overpassShowSpeedCamera = settings.allSettings[Settings.OVERPASS_SHOW_SPEED_CAMERA];
        this.onOverpassSettingsChangeEvent.emit();
      }
      if (this.overpassShowFuelStation != settings.allSettings[Settings.OVERPASS_SHOW_FUEL_STATION]) {
        this.overpassShowFuelStation = settings.allSettings[Settings.OVERPASS_SHOW_FUEL_STATION];
        this.onOverpassSettingsChangeEvent.emit();
      }
      if (this.overpassShowTrafficLight != settings.allSettings[Settings.OVERPASS_SHOW_TRAFFIC_LIGHT]) {
        this.overpassShowTrafficLight = settings.allSettings[Settings.OVERPASS_SHOW_TRAFFIC_LIGHT];
        this.onOverpassSettingsChangeEvent.emit();
      }
    });
  }

  ngOnInit() {
    this.overpassShowSpeedCamera = this.settings.allSettings[Settings.OVERPASS_SHOW_SPEED_CAMERA];
    this.overpassShowFuelStation = this.settings.allSettings[Settings.OVERPASS_SHOW_FUEL_STATION];
    this.overpassShowTrafficLight = this.settings.allSettings[Settings.OVERPASS_SHOW_TRAFFIC_LIGHT];
  }

  /**
   * Create overpass query depends to user's settings.
   * For instance, if speed-camera and fuel-station are active then result will be:
   * '(node({{bbox}})[highway=speed_camera];node({{bbox}})[amenity=fuel];);(._;>;);out qt;'
   */
  resolveQuery() {
    let query = '(';
    if (this.overpassShowSpeedCamera) {
      query += 'node({{bbox}})[highway=speed_camera];';
    }
    if (this.overpassShowFuelStation) {
      query += 'node({{bbox}})[amenity=fuel];';
    }
    if (this.overpassShowTrafficLight) {
      query += 'node({{bbox}})[highway=traffic_signals];'
    }
    query += ');(._;>;);out qt;';
    return query;
  }

  isNecessary() {
    let result = false;
    if (this.overpassShowSpeedCamera) {
      result = true;
    }
    if (this.overpassShowFuelStation) {
      result = true;
    }
    if (this.overpassShowTrafficLight) {
      result = true;
    }
    return result;
  }

}