import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Device } from '@ionic-native/device';
// import { CloudModule } from '@ionic/cloud-angular';

import { FileStorage } from './file-storage';

@NgModule({
  imports: [
    IonicStorageModule.forRoot({
      name: '_db',
      driverOrder: ['sqlite']
    })
    // CloudModule.forRoot({
    //   'core': {
    //     'app_id': 'a160dfe5'
    //   },
    //   'insights': {
    //     'enabled': false
    //   }
    // })
  ],
  providers: [
    StatusBar,
    Geolocation,
    Diagnostic,
    SocialSharing,
    Deeplinks,
    Device,
    FileStorage
  ]
})
export class PluginDepsModule {
}
