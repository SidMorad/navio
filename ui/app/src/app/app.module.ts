import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudModule } from '@ionic/cloud-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { SharedModule } from '../shared/shared.module';

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
    highlightTehranEvenOddTrafficZone: true,
    hasTehranMainTrafficCertificate: false,
    carPlateNumberEvenOrOdd: 'notset',
    lastZoomLevel: 18
  });
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
    SharedModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
    CloudModule.forRoot({
      'core': {
        'app_id': 'a160dfe5'
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
