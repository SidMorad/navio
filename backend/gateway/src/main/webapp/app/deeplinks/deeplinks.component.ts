import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './deeplinks.component.html',
    styleUrls: [
        'deeplinks.css'
    ]
})
export class DeeplinksComponent implements OnDestroy {

    deeplink: any;
    routeSub: any;

    constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer) {
      this.routeSub = this.route.params.subscribe((params) => {
          if (params['latLngZoom']) {
            const url = 'navio://tile.webebook.org/dl/' + params['latLngZoom'];
            this.deeplink = domSanitizer.bypassSecurityTrustUrl(url);
          }
      });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
