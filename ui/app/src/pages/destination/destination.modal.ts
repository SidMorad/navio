import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { AddressDTO } from '../../domain/model/geocoding';
import { MapService } from '../../services';

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
              private mapService: MapService) {
    this.address = navParams.get('address');
  }

  ionViewWillEnter() {
    if (this.mapService.activeRoute) {
      this.ETA = this.mapService.activeRoute.ETA;
      this.distance = this.mapService.activeRoute.distance;
      this.duration = this.mapService.activeRoute.duration;
    }
    else {
      this.ETA = "";
      this.duration = "";
      this.distance = "";
    }
  }

  navigateToAddress() {
    this.dismiss();
    this.mapService.navigateToAddress(this.address);
  }

  stopTheRoute() {
    this.dismiss();
    this.mapService.stopTheRoute();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}