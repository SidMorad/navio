import { NgModule } from '@angular/core';

import { AuthServerProvider, AccountService, LoginService, Principal } from './';

@NgModule({
  providers: [
    AccountService,
    Principal,
    LoginService,
    AuthServerProvider
  ]
})
export class SharedSecurityModule {
}
