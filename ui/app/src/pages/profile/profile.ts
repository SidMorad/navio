import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController } from 'ionic-angular';

import { Principal, LoginService } from '../../shared';

@IonicPage({
  priority: 'low'
})
@Component({
  templateUrl: 'profile.html',
  selector: 'page-profile'
})
export class ProfilePage {
  user: any = {};

  constructor(private navCtrl: NavController, private principal: Principal,
              private loginService: LoginService, private modalCtrl: ModalController,
              private viewCtrl: ViewController) {
  }

  ionViewWillEnter() {
    this.principal.identity().then(account => {
      this.user = account ? account : {};
    });
  }

  openLoginPage() {
    this.viewCtrl.dismiss();
    this.modalCtrl.create('LoginPage').present();
  }

  openSignupPage() {
    this.viewCtrl.dismiss();
    this.modalCtrl.create('SignupPage').present();
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.navCtrl.pop();
  }

  dismiss() {
    this.navCtrl.pop();
  }

}