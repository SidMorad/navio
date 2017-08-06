import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SocialSharingModal } from './socialsharing.modal';

@NgModule({
  declarations: [ SocialSharingModal ],
  imports: [
    IonicPageModule.forChild(SocialSharingModal),
    TranslateModule.forChild()
  ],
  entryComponents: [ SocialSharingModal ]
})
export class SocialSharingModalModule {
}
