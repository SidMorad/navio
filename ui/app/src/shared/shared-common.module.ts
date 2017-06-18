import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedLibsModule } from './shared-libs.module';

// The translate loader needs to know where to load i18n files
export function httpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    SharedLibsModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [Http] }
    })
  ],
  exports: [
    SharedLibsModule,
    TranslateModule
  ]
})
export class SharedCommonModule {}