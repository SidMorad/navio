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

  constructor(navParams: NavParams, private viewCtrl: ViewController,
              private mapService: MapService) {
    this.address = navParams.get('address');
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