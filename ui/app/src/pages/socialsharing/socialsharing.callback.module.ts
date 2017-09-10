import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SocialSharingCallback } from './socialsharing.callback' ;
import { PluginDepsModule } from '../../plugindeps/plugin-deps.module';

@NgModule({
  declarations: [ SocialSharingCallback ],
  imports: [
    IonicPageModule.forChild(SocialSharingCallback),
    PluginDepsModule
  ],
  entryComponents: [ SocialSharingCallback ]
})
export class SocialSharingCallbackModule {
}
