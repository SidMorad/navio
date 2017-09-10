import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedLibsModule, SharedCommonModule, SharedSecurityModule } from './';

@NgModule({
  exports: [
    SharedLibsModule,
    SharedCommonModule,
    SharedSecurityModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}