import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedLibsModule, SharedCommonModule, AuthServerProvider,
         AccountService, LoginService, Principal, customHttpProvider } from './';

@NgModule({
  imports: [
    SharedLibsModule,
    SharedCommonModule
  ],
  providers: [
    Principal,
    LoginService,
    AccountService,
    AuthServerProvider,
    customHttpProvider()
  ],
  exports: [
    SharedLibsModule,
    SharedCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}