import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { SharedCommonModule } from './shared-common.module';

@NgModule({
  imports: [
    SharedLibsModule,
    SharedCommonModule
  ],
  exports: [
    SharedLibsModule,
    SharedCommonModule
  ]
})
export class SharedModule {}