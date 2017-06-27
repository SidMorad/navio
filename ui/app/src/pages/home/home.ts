import { Component, OnInit, OnDestroy, isDevMode } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as moment from 'moment';
import 'moment-duration-format';

import { MapService } from '../../services';
import { Settings } from '../../providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  watchPosition: any;
  ETA: string;
  duration: string;
  distance: string;

  constructor(private geolocation: Geolocation,
              private platform: Platform, private mapService: MapService,
              private settings: Settings, private menuCtrl: MenuController) {

  }

  ngOnInit() {
    this.settings.load().then(() => {
      this.mapService.init();
    });

    this.platform.ready().then((readySource) => {
      var firstTime = true;
      let watchPosition = this.geolocation.watchPosition(
        { enableHighAccuracy: true }
        // Is a Boolean that indicates the application would like to receive the best possible results.
        // If true and if the device is able to provide a more accurate position, it will do so.
        // Note that this can result in slower response times or increased power consumption
        // (with a GPS chip on a mobile device for example). On the other hand, if false,
        // the device can take the liberty to save resources by responding more quickly and/or using less power.
        // Default: false.
        // Note: Android emulator mock location feature is not working if set to false.
      );
      watchPosition.subscribe((data) => {
        console.log("watchPosition event: ", data, " currentZoom level: ", this.mapService.currentZoom);
        if (data.coords) {
          this.mapService.currentLocationLayer.clearLayers();
          this.mapService.currentLocationLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
            { radius : 50}));
          this.mapService.currentLocationLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
            { radius : 10, color: 'white', fillColor: 'purple', fillOpacity: 0.5 }));
          if (firstTime && this.mapService.map && !this.mapService.isCenterToCurrentLocation) {
            this.mapService.centerToCurrentLocation();
            firstTime = false;
          }
        }
        else {
          if (isDevMode()) {  // Workaround for `ionic cordova run android -l` command that doesn't work on latest chrome browser anymore, therefore watchPosition doesn't work either.
              this.mapService.currentLocationLayer.addLayer(L.circleMarker([35.7000, 51.5000],
                { radius : 50}));
              this.mapService.currentLocationLayer.addLayer(L.circleMarker([35.7000, 51.5000],
                { radius : 10, color: 'white', fillColor: 'purple', fillOpacity: 0.5 }));
              if (firstTime && this.mapService.map && !this.mapService.isCenterToCurrentLocation) {
                this.mapService.centerToCurrentLocation();
                firstTime = false;
              }
          }
        }
      }, (error) => {
        console.log("watchPosition throw error: ", error);
      });
      this.watchPosition = watchPosition;
    });

    this.mapService.onActiveRouteChangeEvent.subscribe(() => {
      if (this.mapService.activeRoute) {
        let totalTime = this.mapService.activeRoute.summary.totalTime;
        this.ETA = moment().add(moment.duration(totalTime, 'seconds')).format('h:mm A');
        let totalDistance = this.mapService.activeRoute.summary.totalDistance / 1000;   // Meter to KiloMeter
        this.distance = totalDistance.toFixed(1) + " km";
        this.duration = moment.duration(totalTime, 'seconds').format('h [hrs], m [min]');
      }
      else {
        this.ETA = "";
        this.duration = "";
        this.distance = "";
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(false, 'primary');
  }

  centerToCurrentLocation() {
    this.mapService.centerToCurrentLocation();
  }

  isNotCenterToCurrentLocation() {
    return !this.mapService.isCenterToCurrentLocation;
  }

  ngOnDestroy() {
    if (this.watchPosition) {
      this.watchPosition.unsubscribe();
    }
  }

}