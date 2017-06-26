import { Component, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Favorites } from '../../providers';
import { AddressDTO } from '../../domain/model/geocoding';

@Component({
  selector: 'page-popup',
  templateUrl: 'address.popup.html'
})
export class AddressPopup {

  address: AddressDTO;

  constructor(private favorites: Favorites, private modalCtrl: ModalController) {
  }

  onGoButtonClicked = new EventEmitter();
  goButtonClicked() {
    this.onGoButtonClicked.emit();
  }

  onInfoButtonClicked = new EventEmitter();
  infoButtonClicked() {
    this.onInfoButtonClicked.emit();
    this.modalCtrl.create('AddressModal', { address: this.address }).present();
  }

}