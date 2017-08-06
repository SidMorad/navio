import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Platform, ToastController, ModalController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Deploy } from '@ionic/cloud-angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { SettingsPage, HomePage } from '../pages';
import { GeocodingService } from '../services';
import { Settings, Favorites, Map } from '../providers';
import { AddressDTO } from '../domain/model/geocoding';
import { Principal } from '../shared';

@Component({
  selector: 'app-page',
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  rootPage:any = HomePage;
  items: Observable<AddressDTO[]>;
  geoSearchTerm = new FormControl();
  user: any = {};
  @ViewChild('content') nav: NavController;

  constructor(private platform: Platform, private statusBar: StatusBar,
              private favorites: Favorites, private deploy: Deploy, private settings: Settings,
              private geocodingService: GeocodingService, private modalCtrl: ModalController,
              private map: Map, private toastCtrl: ToastController,
              private translateService: TranslateService, private principal: Principal,
              private splashScreen: SplashScreen, private deeplinks: Deeplinks) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.items = this.geoSearchTerm.valueChanges
                    .debounceTime(400)
                    .distinctUntilChanged()
                    .switchMap(term => this.geocodingService.search(term));     // Credit goes to https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html
  }

  ngOnInit() {
    this.settings.load().then(() => {
      this.translateService.onLangChange.subscribe( data => {
        if (data.lang !== this.platform.lang()) {
          this.platform.setLang(data.lang, true);
          this.platform.setDir((data.lang === 'fa') ? 'rtl': 'ltr', true);
        }
      });
      this.translateService.setDefaultLang(this.settings.allSettings[Settings.PREFER_LANGUAGE]);
      this.translateService.use(this.settings.allSettings[Settings.PREFER_LANGUAGE]);
      console.log("Translate service is set with prefer language: ", this.settings.allSettings[Settings.PREFER_LANGUAGE]);

      this.deploy.channel = 'dev'; // TODO Comment this line before production release
      this.deploy.check().then((hasUpdate: boolean) => {
        if (hasUpdate) {
          this.translateService.get('NEW UPDATE IS AVAILABLE').subscribe((translatedText) => {
            this.toastCtrl.create({
              message: translatedText,
              duration: 3000
            }).present();
          });

          let me = this;
          setTimeout(() => {
            me.deploy.download().then(() => {
              me.deploy.extract().then(() => {
                me.translateService.get('YOUR APP UPDATED TO THE LATEST VERSION').subscribe((translatedText) => {
                  me.toastCtrl.create({
                    message: translatedText,
                    duration: 3000
                  }).present();
                });

                setTimeout(() => {
                  me.deploy.load();
                }, 3000);
              })
            });
          }, 3000);

        }
      });

      this.favorites.load();
    });

    this.principal.identity(true).then(account => {
        this.user = account ? account : {};
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.deeplinks.routeWithNavController(this.nav, {
        '/dl/:location': 'SocialSharingCallback',
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn("Unmatced route", nomatch);
      });
    });
  }

  geoSelected(item: AddressDTO) {
    item.favLabel = item.name;
    this.map.showDestination(item);
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