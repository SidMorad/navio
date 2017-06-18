import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  priority: 'low'
})
@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit, AfterViewInit {

  authenticationError: boolean;
  remoteCallInProgress: boolean;

  constructor(private navCtrl: NavController) {

  }

  login() {
    console.log("Login clicked!");
    this.authenticationError = true;
    this.remoteCallInProgress = true;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  dismiss() {
    this.navCtrl.pop();
  }

}