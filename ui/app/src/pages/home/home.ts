import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Platform, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MapService } from '../../services';
import { Settings } from '../../providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  watchPosition: any;

  constructor(private navCtrl: NavController, private geolocation: Geolocation,
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
        this.mapService.currentLocationLayer.clearLayers();
        this.mapService.currentLocationLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 50}));
        this.mapService.currentLocationLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 10, color: 'white', fillColor: 'purple', fillOpacity: 0.5 }));
        if (firstTime) {
          this.mapService.centerToCurrentLocation();
          firstTime = false;
        }
      });
      this.watchPosition = watchPosition;
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