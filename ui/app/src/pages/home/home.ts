import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ngOnInit() {
    var map = L.map('map', {
      attributionControl: false
    });

    L.tileLayer('http://tile.webebook.org/tile/{z}/{x}/{y}.png', {
      attribution: 'Rahpey | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      attributionPrefix: '',
      maxZoom: 18
    }).addTo(map);

    map.addControl(L.control.attribution({
      position: 'topright',
      prefix: ''
    }));

    var markersLayer = new L.LayerGroup([]);
    markersLayer.addTo(map);

    map.on('click', function(e) {
      console.log(e);
    });

    var currentZoom = 18;
    map.on('zoomend', function(e) {
      console.log("Zoom end event ", e.target._zoom);
      currentZoom = e.target._zoom;
    });

    var violetIcon = new L.Icon({
      iconUrl: 'assets/img/marker-icon-2x-violet.png',
      shadowUrl: 'assets/img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    let watchPosition = this.geolocation.watchPosition();
    watchPosition.subscribe((data) => {
      console.log("Watch event ", data, " CurrentZoom ", currentZoom);
      markersLayer.clearLayers();
      map.setView([data.coords.latitude, data.coords.longitude], currentZoom);
      var marker = L.marker([data.coords.latitude, data.coords.longitude], {icon: violetIcon, draggable: true});
      markersLayer.addLayer(marker);
    });

  }

}