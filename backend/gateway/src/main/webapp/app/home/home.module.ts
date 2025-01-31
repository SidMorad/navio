import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../shared';

import { HOME_ROUTE, DOWNLOAD_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot([ HOME_ROUTE, DOWNLOAD_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHomeModule {}
