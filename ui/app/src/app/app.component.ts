import { Component } from '@angular/core';
import { Platform, ToastController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deploy } from '@ionic/cloud-angular';
import { TranslateService } from '@ngx-translate/core';

import { HomePage, SettingsPage } from '../pages';
import { GeocodingService, MapService } from '../services';
import { Settings } from '../providers';

@Component({
  selector: 'app-page',
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = HomePage;
  items: any[];

  constructor(private platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, deploy: Deploy, settings: Settings,
              private geocodingService: GeocodingService, private modalCtrl: ModalController,
              private mapService: MapService, private toastCtrl: ToastController,
              translateService: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      settings.load().then(() => {
        settings.getValue(Settings.PREFER_LANGUAGE).then(val => {
          translateService.setDefaultLang(val);
          translateService.use(val);
        });
        splashScreen.hide();
      });

      deploy.channel = 'dev'; // TODO Remove this line before production release
      deploy.check().then((hasUpdate: boolean) => {
        if (hasUpdate) {
          let toast = this.toastCtrl.create({
            message: 'New update is available!',
            duration: 3000,
            position: 'top'
          });
          toast.present();

          setTimeout(() => {
            deploy.download().then(() => {
              deploy.extract().then(() => {
                console.log("New snapshot extracted.");
                let toast = this.toastCtrl.create({
                  message: 'Your app updated to the latest version!',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                setTimeout(() => {
                  deploy.load();
                }, 3000);
              })
            });
          }, 3000);

        }
      });

    });
  }

  geoSearch(ev: any) {
    if (!ev.target.value) {
      return;
    }
    this.geocodingService.geocode(ev.target.value).subscribe(result => {
      this.items = result;
    }, error => {
      this.items = [{formatted_address: 'Error: unable to find address.'}];
    });
  }

  geoSelected(item: any) {
    this.mapService.showDestination(item);
  }

  showSettingsModal() {
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }

  exitApp() {
    this.platform.exitApp();
  }

}