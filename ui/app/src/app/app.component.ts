import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, ToastController, ModalController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deploy } from '@ionic/cloud-angular';
import { TranslateService } from '@ngx-translate/core';

import { HomePage, SettingsPage } from '../pages';
import { GeocodingService, MapService } from '../services';
import { Settings, Favorites } from '../providers';
import { AddressDTO } from '../domain/model/geocoding';
import { Principal } from '../shared';

@Component({
  selector: 'app-page',
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  rootPage:any = HomePage;
  items: AddressDTO[];
  user: any = {};
  @ViewChild('content') nav: NavController;

  constructor(private platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, deploy: Deploy, settings: Settings,
              private geocodingService: GeocodingService, private modalCtrl: ModalController,
              private mapService: MapService, private toastCtrl: ToastController,
              private translateService: TranslateService, private principal: Principal,
              favorites: Favorites) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      settings.load().then(() => {
        console.log("Application settings loaded.");
        this.translateService.onLangChange.subscribe( data => {
          if (data.lang !== this.platform.lang()) {
            this.platform.setLang(data.lang, true);
            this.platform.setDir((data.lang === 'fa') ? 'rtl': 'ltr', true);
          }
        });
        translateService.setDefaultLang(settings.allSettings[Settings.PREFER_LANGUAGE]);
        translateService.use(settings.allSettings[Settings.PREFER_LANGUAGE]);
        console.log("Translate service is set with prefer language: ", settings.allSettings[Settings.PREFER_LANGUAGE]);
      });
      favorites.load();

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

  ngOnInit() {
    this.principal.identity(true).then(account => {
        this.user = account ? account : {};
    });
  }

  geoSearch(ev: any) {
    if (!ev.target.value) {
      return;
    }
    this.geocodingService.search(ev.target.value).subscribe(result => {
      this.items = result;
    }, error => {
      console.log("Error on geo serach by ", ev.target.value, " was: ", error);
      this.items = [];
    });
  }

  geoSelected(item: AddressDTO) {
    this.mapService.showDestination(item);
  }

  showSettingsModal() {
    this.modalCtrl.create(SettingsPage).present();
  }

  openProfilePage() {
    this.nav.push('ProfilePage');
  }

  openFavorites() {
    this.nav.push('FavoritesPage');
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  menuOpened() {
    if (this.isAuthenticated()) {
      this.principal.identity().then(account => {
        this.user = account ? account : {};
      });
    }
    else {
      this.user = {};
    }
  }

  exitApp() {
    this.platform.exitApp();
  }

}