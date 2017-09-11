import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsPage } from './settings';
import { PluginDepsModule } from '../../plugindeps/plugin-deps.module';

@NgModule({
  declarations: [ SettingsPage ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild(),
    PluginDepsModule,
  ],
  entryComponents: [ SettingsPage ]
})
export class SettingsModule {}