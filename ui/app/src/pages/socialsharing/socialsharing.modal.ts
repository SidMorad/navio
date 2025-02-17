import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from '@ngx-translate/core';

import { AddressDTO } from '../../domain/model/geocoding';
import { Map } from '../../providers';
import { GATEWAY_HOST_NAME } from '../../app/config';

@IonicPage({
  priority: 'low'
})
@Component({
  templateUrl: 'socialsharing.modal.html',
  selector: 'page-socialsharing'
})
export class SocialSharingModal {
  @ViewChild('subject') subject;

  address: AddressDTO;
  message: { subject: string, body: string} = { subject: '', body: ''};

  constructor(navParams: NavParams, private viewCtrl: ViewController,
              private socialSharing: SocialSharing,
              private toastCtrl: ToastController, private map: Map,
              private translateService: TranslateService) {
    this.address = navParams.get('address');
    this.message.subject = this.address.shortName;
    this.message.body = this.address.name;
  }

  ionViewDidLoaded() {
    setTimeout(() => {
      this.subject.setFocus();
    }, 600);
  }

  sendEmail() {
    let link = 'https://' + GATEWAY_HOST_NAME + '/dl/' + this.address.latlng.lat + '-' + this.address.latlng.lng + '-' + this.map.currentZoom;
    let linkString = '<a href="' + link + '">' + link + '</a><br/><br/>';
    this.translateService.get('SENT_SUCCESSFULLY').subscribe((translated) => {
      this.socialSharing.shareViaEmail(linkString + this.message.body,
        this.message.subject, null).
        then(() => {
          this.dismiss();
          this.toastCtrl.create({
            message: translated,
            duration: 4000,
            position: 'top'
          }).present();
        }).catch((error) => {
          console.log("Error on share via Email: ", error);
        });
    });
  }

  sendTelegram() {
    let link = '[' + this.message.subject + '](https://' + GATEWAY_HOST_NAME + '/dl/' + this.address.latlng.lat + '-' + this.address.latlng.lng + '-' + this.map.currentZoom + ') \n\n';
    this.translateService.get('SENT_SUCCESSFULLY').subscribe((translated) => {
      this.socialSharing.shareVia('telegram',
        link + this.message.body, this.message.subject, null).
        then(() => {
          this.dismiss();
          this.toastCtrl.create({
            message: translated,
            duration: 4000,
            position: 'top'
          });
        }).catch((error) => {
          console.log("Error on share via Telegram: ", error);
        });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}