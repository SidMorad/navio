import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudModule } from '@ionic/cloud-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Ng2Webstorage } from 'ng2-webstorage';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { SharedModule } from '../shared';

import { GeocodingService, TrackingService, SignupService } from '../services';
import { Settings, Favorites, OverpassUtil, Map } from '../providers';

import { AddressPopup, SettingsPage } from '../pages';


export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for the app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values.
   */
  return new Settings(storage, {
    preferLanguage: 'fa',
    country: 'IR',
    city: 'THR',
    highlightTehranMainTrafficZone: true,
    highlightTehranEvenOddTrafficZone: true,
    hasTehranMainTrafficCertificate: false,
    carPlateNumberEvenOrOdd: 'notset',
    lastZoomLevel: 18,
    userGoInvisible: false,
    overpassShowSpeedCamera: true,
    overpassShowFuelStation: false,
    overpassShowTrafficLight: false
  });
}

let pages = [
  MyApp,
  AddressPopup,
  SettingsPage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    StatusBar,
    SplashScreen,
    Geolocation,
    Diagnostic,
    GeocodingService,
    TrackingService,
    SignupService,
    Favorites,
    OverpassUtil,
    Map,

    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

// The translate loader needs to know where to load i18n files
export function httpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    SharedModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: false
    }),
    CloudModule.forRoot({
      'core': {
        'app_id': 'a160dfe5'
      },
      'insights': {
        'enabled': false
      }
    }),
    IonicStorageModule.forRoot({
      name: '_db',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    }),
    Ng2Webstorage.forRoot({
      prefix: 'navio'
    }),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [Http] }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
