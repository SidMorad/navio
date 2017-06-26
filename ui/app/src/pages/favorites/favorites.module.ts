import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { FavoritesPage } from './favorites';

@NgModule({
  declarations: [ FavoritesPage ],
  imports: [
    IonicPageModule.forChild(FavoritesPage),
    TranslateModule.forChild()
  ],
  exports: [
    FavoritesPage
  ]
})
export class FavoritesModule {}