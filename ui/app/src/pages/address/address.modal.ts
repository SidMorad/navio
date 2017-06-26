import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { AddressDTO } from '../../domain/model/geocoding';
import { MapService } from '../../services';
import { Favorites } from '../../providers';

@IonicPage()
@Component({
  templateUrl: 'address.modal.html',
  selector: 'page-modal'
})
export class AddressModal {

  address: AddressDTO;

  constructor(navParams: NavParams, private viewCtrl: ViewController,
              private mapService: MapService, private favorites: Favorites,
              private alertCtrl: AlertController, private translateService: TranslateService,
              private actionSheetCtrl: ActionSheetController) {
    this.address = navParams.get('address');
  }

  navigateToAddress() {
    this.dismiss();
    this.mapService.navigateToAddress(this.address);
  }

  bookmarkIt() {
    this.translateService.get(['ADD', 'FAVORITE', 'CANCEL', 'SAVE']).subscribe((translated) => {
      let alert = this.alertCtrl.create({
        title: translated['ADD'] + ' ' + translated['FAVORITE'],
        inputs: [{
          name: 'label',
          placeholder: translated['FAVORITE'],
          value: this.address.shortName
        }],
        buttons: [
          {
            text: translated['CANCEL'],
            role: 'cancel'
          },
          {
            text: translated['SAVE'],
            handler: data => {
              this.address.favLabel = data.label;
              this.favorites.add(this.address);
            }
          }
        ]
      });
      alert.present();
    });
  }

  removeBookmark() {
    this.translateService.get(['CANCEL', 'DELETE', 'FAVORITE', 'ARE_YOU_SURE_YOU_WANT_TO_DELETE']).subscribe((translated) => {
      let alert = this.alertCtrl.create({
        title: translated['DELETE'] + " " + translated['FAVORITE'],
        subTitle: this.address.favLabel,
        message: translated['ARE_YOU_SURE_YOU_WANT_TO_DELETE'],
        buttons: [
          {
            text: translated['CANCEL'],
            role: 'cancel'
          },
          {
            text: translated['DELETE'],
            handler: data => {
              this.favorites.remove(this.address);
            }
          }
        ]
      });
      alert.present();
    });
  }

  isFavorite() {
    return this.favorites.isFavorite(this.address);
  }

  showMoreActions() {
    this.translateService.get(['CANCEL', 'SET_AS_START_POINT']).subscribe((translated) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: this.address.shortName,
        buttons: [
          {
            text: translated['SET_AS_START_POINT'],
            handler: () => {
              this.dismiss();
              this.mapService.setAsStartPoint(this.address);
            }
          },
          {
            text: translated['CANCEL'],
            role: 'cancel'
        }]
      });
      actionSheet.present();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
