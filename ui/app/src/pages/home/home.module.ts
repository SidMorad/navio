import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { HomePage } from './home';
import { PluginDepsModule } from '../../plugindeps/plugin-deps.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    LoadingBarModule,
    PluginDepsModule
  ],
  entryComponents: [ HomePage ]
})
export class HomeModule {}