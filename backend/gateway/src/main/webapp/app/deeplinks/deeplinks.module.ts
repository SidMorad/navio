import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../shared';

import { DEEPLINKS_ROUTE, DeeplinksComponent } from './';

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot([ DEEPLINKS_ROUTE ], { useHash: true })
    ],
    declarations: [ DeeplinksComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDeeplinksModule {}
