import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Platform, ModalController, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { BlankPage } from '../pages/blank/blank';
// import { Principal } from '../shared';
import { AddressDTO } from '../domain/model';
import { GeocodingService } from '../services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = BlankPage;
  user: any = {};
  @ViewChild('content') nav: NavController;
  items: Observable<AddressDTO[]>;
  geoSearchTerm = new FormControl();

  constructor(private platform: Platform,
    splashScreen: SplashScreen, private modalCtrl: ModalController,
    translateService: TranslateService, private geocodingService: GeocodingService) {
    console.log("AppComponent#constructor", new Date());
    platform.ready().then(() => {
      console.log("AppComponent#platformReady fired!", new Date());
      splashScreen.hide();
    });
    // Loading languages
    translateService.setDefaultLang('fa');
    translateService.use('en');
  }

  ngAfterViewInit() {
    console.log("AppComponent#ngAfterViewInit");
    // this.principal.identity(true).then(account => {
    //   this.user = account ? account : {};
    // });
    this.items = this.geoSearchTerm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.geocodingService.search(term));     // Credit goes to https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html
  }

  geoSelected(item: AddressDTO) {
    item.favLabel = item.name;
    this.nav.push('SocialSharingCallback', {
      location: item.latlng.lat + '-' + item.latlng.lng
    });
  }

  isSearchInProgress(): boolean {
    return this.geocodingService.searchInProgress;
  }

  showSettingsModal() {
    this.modalCtrl.create('SettingsPage').present();
  }

  openProfilePage() {
    this.nav.push('ProfilePage');
  }

  openFavorites() {
    this.nav.push('FavoritesPage');
  }

  // isAuthenticated() {
  //   return this.principal.isAuthenticated();
  // }

  menuOpened() {
    // if (this.isAuthenticated()) {
    //   this.principal.identity().then(account => {
    //     this.user = account ? account : {};
    //   });
    // }
    // else {
    //   this.user = {};
    // }
  }

  isRTL(): boolean {
    return this.platform.isRTL;
  }

  exitApp() {
    this.platform.exitApp();
  }

}
