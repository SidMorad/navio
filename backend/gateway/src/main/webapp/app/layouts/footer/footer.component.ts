import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { VERSION } from '../../app.constants';
import { FindLanguageFromKeyPipe } from '../../shared';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  version: string;
  isRTL: boolean;

  constructor(private translateService: TranslateService,
              private findLanguageFromKeyPipe: FindLanguageFromKeyPipe) {
    this.version = VERSION ? 'v' + VERSION : '';
  }

  ngOnInit() {
    this.translateService.onLangChange.subscribe((event) => {
      this.isRTL = this.findLanguageFromKeyPipe.isRTL(event.lang);
    });
  }

}
