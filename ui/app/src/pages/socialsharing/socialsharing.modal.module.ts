import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SocialSharingModal } from './socialsharing.modal';
import { PluginDepsModule } from '../../plugindeps/plugin-deps.module';

@NgModule({
  declarations: [ SocialSharingModal ],
  imports: [
    IonicPageModule.forChild(SocialSharingModal),
    TranslateModule.forChild(),
    PluginDepsModule
  ],
  entryComponents: [ SocialSharingModal ]
})
export class SocialSharingModalModule {
}
