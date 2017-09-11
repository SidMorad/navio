import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'blank.html'
})
export class BlankPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

  }

  ngAfterViewInit() {
    this.navCtrl.push('HomePage');
    let me = this;
    setTimeout(function() {         // Auto close this blank page after 5 seconds.
      me.viewCtrl.dismiss();
    }, 5000);
  }

}
