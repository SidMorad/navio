import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { MyApp } from './app.component';
import { BlankPage } from '../pages/blank/blank';
import { AddressPopup } from '../pages/address/address.popup';
import { SharedModule } from '../shared/shared.module';
import { Settings, OverpassUtil, Favorites, Map } from '../providers';
import { TrackingService, GeocodingService, SignupService } from '../services';
import { InMemoryStorage } from '../shared/storage/in-memory-storage';
import { customHttpProvider } from '../shared/interceptor/http.provider';

export function provideSettings(inMemoryStorage: InMemoryStorage) {
  /**
   * The Settings provider takes a set of default settings for the app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values.
   */
  return new Settings(inMemoryStorage, {
    preferLanguage: 'fa',
    country: 'IR',
    city: 'THR',
    highlightTehranMainTrafficZone: true,
    highlightTehranEvenOddTrafficZone: true,
    hasTehranMainTrafficCertificate: true,
    carPlateNumberEvenOrOdd: 'notset',
    lastZoomLevel: 18,
    userGoInvisible: false,
    overpassShowSpeedCamera: true,
    overpassShowFuelStation: false,
    overpassShowTrafficLight: false,
    useCacheForMapTiles: true,
    centerToPositionFrequently: 5,
    autoReRoute: false
  });
}


@NgModule({
  declarations: [
    MyApp,
    BlankPage,
    AddressPopup
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
    SharedModule,
    LoadingBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BlankPage,
    AddressPopup
  ],
  providers: [
    SplashScreen,
    { provide: Settings, useFactory: provideSettings, deps: [InMemoryStorage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    customHttpProvider(),
    GeocodingService,
    TrackingService,
    SignupService,
    Favorites,
    OverpassUtil,
    Map
  ]
})
export class AppModule { }
