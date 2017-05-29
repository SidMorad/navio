import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deploy } from '@ionic/cloud-angular';

import { HomePage } from '../pages/home/home';
import { GeocodingService, MapService } from '../services';

@Component({
  selector: 'app-page',
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = HomePage;
  items: any[];

  constructor(private platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, deploy: Deploy,
              private geocodingService: GeocodingService,
              private mapService: MapService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      deploy.channel = 'dev'; // TODO Remove this line before production release
      deploy.check().then((hasUpdate: boolean) => {
        if (hasUpdate) {
          deploy.download().then(() => {
            deploy.extract().then(() => {
              console.log("New snapshot extracted.");
              deploy.load();
              // TODO show app updated toast.
            })
          });
        }
      });

    });
  }

  geoSearch(ev: any) {
    console.log(ev.target.value);
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
    console.log(item.geometry.location);
    this.mapService.showDestination(item);
  }

  exitApp() {
    this.platform.exitApp();
  }

}