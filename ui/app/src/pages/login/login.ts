import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { LoginService } from '../../shared';

@IonicPage({
  priority: 'low'
})
@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements AfterViewInit {

  account: { username: string, password: string, rememberMe: boolean} = {
    username: '', password: '', rememberMe: false
  };
  authenticationError: boolean;
  remoteCallInProgress: boolean;

  constructor(private viewCtrl: ViewController, private loginService: LoginService) {
  }

  login() {
    this.remoteCallInProgress = true;
    this.authenticationError = false;
    this.loginService.login({
      username: this.account.username,
      password: this.account.password,
      rememberMe: this.account.rememberMe
    }).then(() => {
      this.remoteCallInProgress = false;
      this.authenticationError = false;
      this.viewCtrl.dismiss();
    }).catch(() => {
      this.authenticationError = true;
      this.remoteCallInProgress = false;
    });
  }

  ngAfterViewInit() {
    // this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
  }

  dismiss() {
    this.remoteCallInProgress = false;
    this.authenticationError = false;
    this.viewCtrl.dismiss();
  }

}