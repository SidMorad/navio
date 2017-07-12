import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { DestinationModal } from './destination.modal';

@NgModule({
  declarations: [ DestinationModal ],
  imports: [
    IonicPageModule.forChild(DestinationModal),
    TranslateModule.forChild()
  ],
  entryComponents: [ DestinationModal ]
})
export class DestinationModalModule {
}
