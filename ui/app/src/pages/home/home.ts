import { Component, OnDestroy, isDevMode } from '@angular/core';
import { MenuController, ModalController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TranslateService } from '@ngx-translate/core';

import { TrackingService } from '../../services';
import { Settings, Map } from '../../providers';
import { CarSpeedDTO , UserLocationDTO } from '../../domain/model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

  watchPosition: any;
  ETA: string;
  duration: string;
  distance: string;

  constructor(private geolocation: Geolocation,
              private settings: Settings, private trackingService: TrackingService,
              private menuCtrl: MenuController, private map: Map,
              private modalCtrl: ModalController, private diagnostic: Diagnostic,
              private alertCtrl: AlertController, private translateService: TranslateService) {
  }

  ionViewDidLoad() {
    this.settings.load().then(() => {
      this.checkIfLocationServiceIsEnabled();
      this.map.init();
    });

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
    this.menuCtrl.swipeEnable(false, 'primary');
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
        maximumAge: 30000
      }
    );
    this.watchPosition.subscribe((data) => {
      console.log("watchPosition event: ", data, " currentZoom level: ", this.map.currentZoom);
      if (data.coords) {
        this.map.currentLocationLayer.clearLayers();
        this.map.currentLocationLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 50}));
        this.map.currentLocationLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 10, color: 'white', fillColor: 'purple', fillOpacity: 0.5 }));
        if (firstTime && this.map.map && this.map.centerToCurrentLocation()) {
          firstTime = false;
        }
        if (this.map.shouldWeSendCarSpeed()) {
          if (data.coords.speed) {
            this.trackingService.trackCarSpeed(CarSpeedDTO.toDTO(data.coords)).subscribe();
          }
        }
        // Issue #24 Online users visiable on the map, is deactivated for now. refs: https://trello.com/c/bgPyzw51/51-display-online-users
        // For activating it again? uncomment following line:
        // this.trackingService.trackUserLocation(UserLocationDTO.toDTO(data.coords)).subscribe();
      }
      else {
        if (isDevMode()) {  // Workaround for `ionic cordova run android -l` command that doesn't work on latest chrome browser anymore, therefore watchPosition doesn't work either.
            this.map.currentLocationLayer.addLayer(L.circleMarker([35.7000, 51.5000],
              { radius : 50}));
            this.map.currentLocationLayer.addLayer(L.circleMarker([35.7000, 51.5000],
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

  isInDrivingMode(): boolean {
    return this.map.isInDrivingMode;
  }

  openDestinationModal() {
    this.modalCtrl.create('DestinationModal', { address: this.map.destination }).present();
  }

  ngOnDestroy() {
    if (this.watchPosition) {
      this.watchPosition.unsubscribe();
    }
  }

}