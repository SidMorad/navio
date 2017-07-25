import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {

  private SETTINGS_KEY: string = 'settings_key';
  public static readonly LAST_ZOOM_LEVEL_KEY: string = 'lastZoomLevel';
  public static readonly PREFER_LANGUAGE: string = 'preferLanguage';
  public static readonly HIGHLIGHT_TEHRAN_MAIN_TRAFFIC_ZONE: string = 'highlightTehranMainTrafficZone';
  public static readonly HIGHLIGHT_TEHRAN_EVEN_ODD_TRAFFIC_ZONE: string = 'highlightTehranEvenOddTrafficZone';
  public static readonly HAS_TEHRAN_MAIN_TRAFFIC_CERTIFICATE: string = 'hasTehranMainTrafficCertificate';
  public static readonly CAR_PLATE_NUMBER_EVEN_OR_ODD: string = 'carPlateNumberEvenOrOdd';
  public static readonly USER_GO_INVISIBLE: string = 'userGoInvisible';

  public static readonly OVERPASS_SHOW_SPEED_CAMERA = 'overpassShowSpeedCamera';
  public static readonly OVERPASS_SHOW_FUEL_STATION = 'overpassShowFuelStation';
  public static readonly OVERPASS_SHOW_TRAFFIC_LIGHT = 'overpassShowTrafficLight';

  settings: any;

  _defaults: any;
  _readyPromise: Promise<any>;
  onSettingsChangeEvent = new EventEmitter();

  constructor(public storage: Storage, defaults: any) {
    this._defaults = defaults;
  }

  load() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        return this._mergeDefaults(this._defaults);
      } else {
        this.settings = this._defaults;
        return this.save();
      }
    });
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.save();
  }

  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    console.log("Settings.setValue[" + value + "] for key[" + key + "]");
    this.settings[key] = value;
    return this.save();
  }

  setAll(value: any) {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  getValue(key: string) {
    return this.storage.get(this.SETTINGS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  save() {
    return this.setAll(this.settings).then((val) => {
      this.onSettingsChangeEvent.emit();
    });
  }

  get allSettings() {
    return this.settings;
  }

}