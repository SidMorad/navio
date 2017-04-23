import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    var map = L.map('map', {
      attributionControl: false
    });
    map.setView([35.6961, 51.4231], 11);
    L.tileLayer('http://tile.webebook.org/tile/{z}/{x}/{y}.png', {
      attribution: 'Rahpey | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      attributionPrefix: '',
      maxZoom: 18
    }).addTo(map);

    map.addControl(L.control.attribution({
      position: 'topright',
      prefix: ''
    }));
  }

}