import { Route } from '@angular/router';

import { DeeplinksComponent } from './deeplinks.component';

export const DEEPLINKS_ROUTE: Route = {
    path: 'dl/:latLngZoom',
    component: DeeplinksComponent,
    data: {
        authorities: [],
        pageTitle: 'deeplinks.title'
    }
};
