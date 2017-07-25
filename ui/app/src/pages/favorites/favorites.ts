import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, AlertController, ItemSliding } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Favorites } from '../../providers';
import { MapService } from '../../services';
import { AddressDTO } from '../../domain/model/geocoding';

@IonicPage()
@Component({
  templateUrl: 'favorites.html'
})
export class FavoritesPage {

  favs: AddressDTO[];

  constructor(private favorites: Favorites, private mapService: MapService,
              private viewCtrl: ViewController, private modalCtrl: ModalController,
              private translateService: TranslateService, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.reloadFavList();
  }

  reloadFavList() {
    this.favs = this.favorites.list();
    console.log(this.favs);
  }

  showLocation(address: AddressDTO) {
    this.viewCtrl.dismiss();
    this.mapService.navigateToAddress(address);
  }

  deleteBookmark(address: AddressDTO) {
    this.favorites.remove(address);
    this.reloadFavList();
  }

  editBookmark(address: AddressDTO) {
    this.translateService.get(['EDIT', 'FAVORITE', 'CANCEL', 'SAVE']).subscribe((translated) => {
      let alert = this.alertCtrl.create({
        title: translated['EDIT'] + ' ' + translated['FAVORITE'],
        inputs: [{
          name: 'label',
          placeholder: translated['FAVORITE'],
          value: address.favLabel
        }],
        buttons: [
          {
            text: translated['CANCEL'],
            role: 'cancel'
          },
          {
            text: translated['SAVE'],
            handler: data => {
              address.favLabel = data.label;
              console.log("Address before edit: ", address);
              this.favorites.add(address);
              this.reloadFavList();
            }
          }
        ]
      });
      alert.present();
    });
  }

  showInfoModal(address: AddressDTO) {
    this.viewCtrl.dismiss();
    this.modalCtrl.create('AddressModal', { address: address }).present();
  }

  simulateClose(slidingItem: ItemSliding) {
    slidingItem.close();
  }

}