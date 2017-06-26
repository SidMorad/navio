import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddressModal } from './address.modal';

@NgModule({
  declarations: [ AddressModal ],
  imports: [
    IonicPageModule.forChild(AddressModal),
    TranslateModule.forChild()
  ],
  entryComponents: [ AddressModal ]
})
export class AddressModalModule {}