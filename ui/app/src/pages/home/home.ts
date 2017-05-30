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
      let watchPosition = this.geolocation.watchPosition();
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