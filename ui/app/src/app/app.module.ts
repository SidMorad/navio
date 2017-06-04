import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudModule } from '@ionic/cloud-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';

import { GeocodingService, MapService } from '../services';
import { Settings } from '../providers';

import { HomePage, LeafletPopupComponent, SettingsPage } from '../pages';


export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for the app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values.
   */
  return new Settings(storage, {
    preferLanguage: 'en',
    country: 'IR',
    city: 'THR',
    highlightTehranMainTrafficZone: true,
    hasTehranMainTrafficCertificate: 'notset',
    isCarPlateEvenOrOdd: 'notset',
    lastZoomLevel: 18
  });
}

// The translate loader needs to know where to load i18n files
export function httpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

let pages = [
  MyApp,
  HomePage,
  LeafletPopupComponent,
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
    GeocodingService,
    MapService,

    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot({
      'core': {
        'app_id': 'a160dfe5'
      }
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [Http] }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
