import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SocialSharingCallback } from './socialsharing.callback' ;

@NgModule({
  declarations: [ SocialSharingCallback ],
  imports: [
    IonicPageModule.forChild(SocialSharingCallback)
  ],
  entryComponents: [ SocialSharingCallback ]
})
export class SocialSharingCallbackModule {
}
