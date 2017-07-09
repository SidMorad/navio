import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { HomeComponent } from './';

export const DOWNLOAD_ROUTE: Route = {
    path: 'download',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
