import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { AddressDTO } from '../../domain/model/geocoding';
import { Map } from '../../providers';

@IonicPage({
  priority: 'high'
})
@Component({
  templateUrl: 'destination.modal.html',
  selector: 'page-destination-modal'
})
export class DestinationModal {

  address: AddressDTO;
  duration: string;
  ETA: string;
  distance: string;

  constructor(navParams: NavParams, private viewCtrl: ViewController,
              private map: Map) {
    this.address = navParams.get('address');
  }

  ionViewWillEnter() {
    if (this.map.activeRoute) {
      this.ETA = this.map.activeRoute.ETA;
      this.distance = this.map.activeRoute.distance;
      this.duration = this.map.activeRoute.duration;
    }
    else {
      this.ETA = "";
      this.duration = "";
      this.distance = "";
    }
  }

  navigateToAddress() {
    this.dismiss();
    this.map.navigateToAddress(this.address);
  }

  stopTheRoute() {
    this.dismiss();
    this.map.stopTheRoute();
  }

  showAlternativeRoutes() {
    this.dismiss();
    this.map.showAlternativeRoutes(this.address);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}