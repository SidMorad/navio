import { Component } from '@angular/core';
import { Platform, ToastController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deploy } from '@ionic/cloud-angular';
import { TranslateService } from '@ngx-translate/core';

import { HomePage, SettingsPage } from '../pages';
import { GeocodingService, MapService } from '../services';
import { Settings } from '../providers';
import { AddressDTO } from '../domain/model/geocoding';

@Component({
  selector: 'app-page',
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = HomePage;
  items: AddressDTO[];

  constructor(private platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, deploy: Deploy, settings: Settings,
              private geocodingService: GeocodingService, private modalCtrl: ModalController,
              private mapService: MapService, private toastCtrl: ToastController,
              private translateService: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      settings.load().then(() => {
        settings.getValue(Settings.PREFER_LANGUAGE).then(val => {
          this.translateService.onLangChange.subscribe( data => {
            if (data.lang !== this.platform.lang()) {
              this.platform.setLang(data.lang, true);
              this.platform.setDir((data.lang === 'fa') ? 'rtl': 'ltr', true);
            }
          });
          translateService.setDefaultLang(val);
          translateService.use(val);
        });
        splashScreen.hide();
      });

      deploy.channel = 'dev'; // TODO Remove this line before production release
      deploy.check().then((hasUpdate: boolean) => {
        if (hasUpdate) {
          this.translateService.get('NEW UPDATE IS AVAILABLE').subscribe((trans) => {
            this.toastCtrl.create({
              message: trans,
              duration: 3000,
              position: 'top'
            }).present;
          });


          setTimeout(() => {
            deploy.download().then(() => {
              deploy.extract().then(() => {
                this.translateService.get('YOUR APP UPDATED TO THE LATEST VERSION').subscribe((translated) => {
                  this.toastCtrl.create({
                    message: 'Your app updated to the latest version!',
                    duration: 3000
                  }).present();
                });

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
    this.geocodingService.search(ev.target.value).subscribe(result => {
      this.items = result;
    }, error => {
      this.items = [new AddressDTO({display_name: 'Error: unable to find address.'})];
    });
  }

  geoSelected(item: AddressDTO) {
    this.mapService.showDestination(item);
  }

  showSettingsModal() {
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }

  openLoginPage() {
    this.modalCtrl.create('LoginPage').present();
  }

  exitApp() {
    this.platform.exitApp();
  }

}