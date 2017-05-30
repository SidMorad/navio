import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MapService } from '../../services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  watchPosition: any;

  constructor(private navCtrl: NavController, private geolocation: Geolocation,
              private platform: Platform, private mapService: MapService) {

  }

  ngOnInit() {
    this.mapService.init();

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
        this.mapService.markersLayer.clearLayers();
        if (firstTime) {
          this.mapService.map.setView([data.coords.latitude, data.coords.longitude], this.mapService.currentZoom);
          firstTime = false;
        }
        this.mapService.markersLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 50}));
        this.mapService.markersLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 10, color: 'white', fillColor: 'purple', fillOpacity: 0.5 }));
      });
      this.watchPosition = watchPosition;
    });

  }

  ngOnDestroy() {
    if (this.watchPosition) {
      this.watchPosition.unsubscribe();
    }
  }

}