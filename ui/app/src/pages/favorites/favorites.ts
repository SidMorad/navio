import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, AlertController,
         ItemSliding, Item, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Favorites, Map } from '../../providers';
import { AddressDTO } from '../../domain/model/geocoding';

@IonicPage()
@Component({
  templateUrl: 'favorites.html'
})
export class FavoritesPage {

  favs: AddressDTO[];
  activeItemSliding: ItemSliding = null;

  constructor(private favorites: Favorites, private map: Map, private platform: Platform,
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
    this.map.navigateToAddress(address);
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

  reorderItems(indexes) {
    let element = this.favs[indexes.from];
    this.favs.splice(indexes.from, 1);
    this.favs.splice(indexes.to, 0, element);
    this.favorites.set(this.favs);
  }

  showInfoModal(address: AddressDTO) {
    this.viewCtrl.dismiss();
    this.modalCtrl.create('AddressModal', { address: address }).present();
  }

  simulateOpen(itemSlide: ItemSliding, item: Item) {
    if(this.activeItemSliding !== null) { //use this if only one active sliding item allowed
      this.activeItemSliding.close();
      this.activeItemSliding = null;
    }
    this.activeItemSliding = itemSlide;

    let swipeAmount = -194; //set your required swipe amount
    if (this.platform.isRTL) {
      swipeAmount = 194;
    }

    itemSlide.startSliding(swipeAmount);
    itemSlide.moveSliding(swipeAmount);

    itemSlide.setElementClass('active-options-right', true);
    itemSlide.setElementClass('active-swipe-right', true);

    item.setElementStyle('transition', null);
    item.setElementStyle('transform', 'translate3d('+swipeAmount+'px, 0px, 0px)');
  }

}