import { Component, OnDestroy, isDevMode } from '@angular/core';
import { IonicPage, ModalController, AlertController, Platform,
         ToastController, NavController, MenuController, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Device } from '@ionic-native/device';
import { TranslateService } from '@ngx-translate/core';
// import { Deploy } from '@ionic/cloud-angular';

import { TrackingService } from '../../services';
import { Settings, Map, Favorites } from '../../providers';
import { CarSpeedDTO } from '../../domain/model';
import { FileStorage } from '../../plugindeps/file-storage';
import { InMemoryStorage } from '../../shared/storage/in-memory-storage';
import { Principal } from '../../shared/auth/principal.service';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

  watchPosition: any;
  ETA: string;
  duration: string;
  distance: string;

constructor(private geolocation: Geolocation, private platform: Platform,
  private settings: Settings, private trackingService: TrackingService,
  private map: Map, private favorites: Favorites, private deeplinks: Deeplinks,
  private modalCtrl: ModalController, private diagnostic: Diagnostic,
  private alertCtrl: AlertController, private translateService: TranslateService,
  private navCtrl: NavController, private fileStorage: FileStorage,
  private inMemoryStorage: InMemoryStorage, private device: Device,
  private principal: Principal, private statusBar: StatusBar,
  private toastCtrl: ToastController, private menuCtrl: MenuController,
  private ionicApp: IonicApp) {
  this.initApp();
}

  ionViewDidLoad() {
    this.fileStorage.loadSettings().then(() => {
      this.settings.load();
      this.checkIfLocationServiceIsEnabled();
      this.map.init();
    })

    let me = this;
    this.diagnostic.registerLocationStateChangeHandler(function(state) {
      if (state != 'location_off') {
        me.initWatchPosition();
      }
    });

    this.map.onActiveRouteChangeEvent.subscribe(() => {
      if (this.map.activeRoute) {
        this.ETA = this.map.activeRoute.ETA;
        this.distance = this.map.activeRoute.distance;
        this.duration = this.map.activeRoute.duration;
      }
      else {
        this.ETA = "";
        this.duration = "";
        this.distance = "";
      }
    });
  }

  ionViewWillEnter() {
    // this.menuCtrl.swipeEnable(false, 'primary');
  }

  initWatchPosition() {
    if (this.watchPosition) {
      return;
    }
    var firstTime = true;
    this.watchPosition = this.geolocation.watchPosition(
      { enableHighAccuracy: true,
      // Is a Boolean that indicates the application would like to receive the best possible results.
      // If true and if the device is able to provide a more accurate position, it will do so.
      // Note that this can result in slower response times or increased power consumption
      // (with a GPS chip on a mobile device for example). On the other hand, if false,
      // the device can take the liberty to save resources by responding more quickly and/or using less power.
      // Default: false.
      // Note: Android emulator mock location feature is not working if set to false.
        // maximumAge: 30000,
        // timeout: 27000
      }
    );
    this.watchPosition.subscribe((data) => {
      console.log("watchPosition event: ", data, " currentZoom level: ", this.map.currentZoom);
      if (data.coords) {
        this.map.currentLocationLayerGroup.clearLayers();
        this.map.currentLocationLayerGroup.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 50}));
        this.map.currentLocationLayerGroup.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 10, color: 'white', fillColor: 'purple', fillOpacity: 0.5 }));
        if (firstTime && this.map.map && this.map.centerToCurrentLocation()) {
          firstTime = false;
        }
        if (this.map.shouldWeSendCarSpeed()) {
          // if (data.coords.speed) {
            this.trackingService.trackCarSpeed(CarSpeedDTO.toDTO(data.coords)).subscribe();
          // }
        }
        // Issue #24 Online users visiable on the map, is deactivated for now. refs: https://trello.com/c/bgPyzw51/51-display-online-users
        // For activating it again? uncomment following line:
        // this.trackingService.trackUserLocation(UserLocationDTO.toDTO(data.coords)).subscribe();
      }
      else {
        if (isDevMode()) {  // Workaround for `ionic cordova run android -l` command that doesn't work on latest chrome browser anymore, therefore watchPosition doesn't work either.
            this.map.currentLocationLayerGroup.addLayer(L.circleMarker([35.7000, 51.5000],
              { radius : 50}));
            this.map.currentLocationLayerGroup.addLayer(L.circleMarker([35.7000, 51.5000],
              { radius : 10, color: 'white', fillColor: 'purple', fillOpacity: 0.5 }));
            if (firstTime && this.map.map && this.map.centerToCurrentLocation()) {
              firstTime = false;
            }
        }
      }
    }, (error) => {
      console.log("watchPosition throw error: ", error);
    });
    console.log("Geolocaion Watch position initalized.");
  }

  checkIfLocationServiceIsEnabled() {
    this.diagnostic.isLocationEnabled().then((enabled) => {
      if (enabled) {
        this.initWatchPosition();
      } else {
        this.translateService.get(['ENABLE_LOCATION_ALERT_TITLE', 'ENABLE_LOCATION_ALERT_MESSAGE', 'SWITCH_ON']).subscribe((translated) => {
          let alert = this.alertCtrl.create({
            title: translated['ENABLE_LOCATION_ALERT_TITLE'],
            message: translated['ENABLE_LOCATION_ALERT_MESSAGE'],
            buttons: [
              {
                text: translated['SWITCH_ON'],
                handler: () => {
                  this.diagnostic.switchToLocationSettings();
                }
              }
            ],
            enableBackdropDismiss: false
          });
          alert.present();
        });
      }
    }).catch((error) => {
      console.log("Error on check if location service is enabled: ", error);
    });
  }

  centerToCurrentLocation() {
    this.map.centerToCurrentLocation();
  }

  isNotCenterToCurrentLocation() {
    return !this.map.isCenterToCurrentLocation;
  }

  reRoute() {
    this.map.reRoute();
  }

  isInDrivingMode(): boolean {
    return this.map.isInDrivingMode;
  }

  isAlternativeRoutesVisiable(): boolean {
    return this.map.showAlternatives;
  }

  removeAlternativeRoutes() {
    this.map.removeAlternativeRoutes();
  }

  openDestinationModal() {
    this.modalCtrl.create('DestinationModal', { address: this.map.destination }).present();
  }

  initApp() {
    this.platform.ready().then(() => {
      this.fileStorage.loadSettings().then(() => {
        this.settings.load();
        this.translateService.onLangChange.subscribe( data => {
          console.log("OnLangChange triggered with data: ", data);
          this.platform.setLang(data.lang, true);
          this.platform.setDir((data.lang === 'fa') ? 'rtl': 'ltr', true);
        });
        this.translateService.setDefaultLang(this.settings.allSettings[Settings.PREFER_LANGUAGE]);
        this.translateService.use(this.settings.allSettings[Settings.PREFER_LANGUAGE]);
        console.log("Translate service is set with prefer language: ", this.settings.allSettings[Settings.PREFER_LANGUAGE]);

        this.deeplinks.routeWithNavController(this.navCtrl, {
          '/dl/:location': 'SocialSharingCallback',
        }).subscribe((match) => {
          console.log('Successfully routed', match);
        }, (nomatch) => {
          console.warn("Unmatced route", nomatch);
        });

        this.inMemoryStorage.setValue(Settings.DEVICE_UUID, this.device.uuid, false);
        this.statusBar.styleDefault();
      });

      this.fileStorage.loadFavorites().then(() => {
        this.favorites.load();
      });

      this.fileStorage.get(InMemoryStorage.AUTH_TOKEN_KEY).then((value) => {      // Remember-me feature
        if (value) {
          this.inMemoryStorage.setValue(InMemoryStorage.AUTH_TOKEN_KEY, value, false);
          this.principal.identity(true).then();
        }
      });

      // Handle back button for exit confirmation
      let lastTimeBackPressed = 0;
      let timePeriodToExit = 3000;
      this.platform.registerBackButtonAction(() => {
        let activePortal = this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          // this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
        }
        else if (this.menuCtrl.isOpen()) {
          this.menuCtrl.close();
        }
        else if (this.navCtrl.getActive().component.name === "HomePage") {
          if (new Date().getTime() - lastTimeBackPressed < timePeriodToExit) {
            this.platform.exitApp();
          }
          else {
            this.translateService.get('PRESS_BACK_AGAIN_TO_EXIT_QM').subscribe((translatedMessage) => {
              this.toastCtrl.create({
                message: translatedMessage,
                duration: 3000
              }).present();
            });
            lastTimeBackPressed = new Date().getTime();
          }
        }
        else {
          this.navCtrl.pop();
        }
      });

    });

    // this.deploy.channel = 'dev'; // TODO Comment this line before production release
    // this.deploy.check().then((hasUpdate: boolean) => {
    //   if (hasUpdate) {
    //     this.translateService.get('NEW UPDATE IS AVAILABLE').subscribe((translatedText) => {
    //       this.toastCtrl.create({
    //         message: translatedText,
    //         duration: 3000
    //       }).present();
    //     });
    //
    //     let me = this;
    //     setTimeout(() => {
    //       me.deploy.download().then(() => {
    //         me.deploy.extract().then(() => {
    //           me.translateService.get('YOUR APP UPDATED TO THE LATEST VERSION').subscribe((translatedText) => {
    //             me.toastCtrl.create({
    //               message: translatedText,
    //               duration: 3000
    //             }).present();
    //           });
    //
    //           setTimeout(() => {
    //             me.deploy.load();
    //           }, 3000);
    //         })
    //       });
    //     }, 3000);
    //   }
    // });

  }

  ngOnDestroy() {
    if (this.watchPosition) {
      this.watchPosition.unsubscribe();
    }
  }

}