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
    var violetIcon = new L.Icon({
      iconUrl: 'assets/img/marker-icon-2x-violet.png',
      shadowUrl: 'assets/img/marker-violet.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.geolocation.getCurrentPosition().then((resp) => {
      map.setView([resp.coords.latitude, resp.coords.longitude], 18);

      L.marker([resp.coords.latitude, resp.coords.longitude], {icon: violetIcon, draggable: true}).addTo(map);
      L.tileLayer('http://tile.webebook.org/tile/{z}/{x}/{y}.png', {
        attribution: 'Rahpey | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        attributionPrefix: '',
        maxZoom: 18
      }).addTo(map);

      map.addControl(L.control.attribution({
        position: 'topright',
        prefix: ''
      }));

      map.on('click', function(e) {
        console.log(e);
      });
    }).catch((error) => {
      console.log("Error on getting current location: ", error);
    });
  }

}