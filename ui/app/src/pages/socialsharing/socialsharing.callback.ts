import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Map } from '../../providers';
import { LatLng } from '../../domain/model';

@IonicPage()
@Component({
  template: ``
})
export class SocialSharingCallback {

  constructor(navParams: NavParams, map: Map, private viewCtrl: ViewController) {
    let locStr = navParams.get('location');
    let latLng = new LatLng(locStr.split('-')[0], locStr.split('-')[1]);
    map.currentZoom = locStr.split('-')[2];
    map.centerToCurrentLocation();
    map.showDestinationByLatLng(latLng, true, locStr.split('-')[2]);
    map.map.setZoom(locStr.split('-')[2]);
  }

  ngAfterViewInit() {
    this.viewCtrl.dismiss();
  }

}