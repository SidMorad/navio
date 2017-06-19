import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { SignupService } from '../../../services';

@IonicPage()
@Component({
  templateUrl: 'signup.html',
  selector: 'page-signup'
})
export class SignupPage implements OnInit {

  account: { username: string, password: string, email: string, langKey: string };
  success: boolean;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  remoteCallInProgress: boolean;

  constructor(private viewCtrl: ViewController, private translateService: TranslateService,
              private signupService: SignupService) {
  }

  ngOnInit() {
    this.success = false;
    this.account = { username: '', password: '', email: '', langKey: ''};
  }

  doSignup() {
    this.error = null;
    this.success = false;
    this.errorUserExists = null;
    this.errorEmailExists = null;
    this.remoteCallInProgress = true;
    this.account.langKey = this.translateService.currentLang;
    this.signupService.save(this.account).subscribe(() => {
      this.success = true;
      this.remoteCallInProgress = false;
    }, (response) => this.processError(response));
  }

  processError(response) {
    this.success = false;
    this.remoteCallInProgress = false;
    if (response.status === 400 && response._body === 'login already in use') {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response._body === 'email address already in use') {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}