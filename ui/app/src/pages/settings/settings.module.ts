import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild()
  ],
  entryComponents: [
    SettingsPage
  ]
})
export class SettingsPageModule {}