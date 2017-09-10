import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedLibsModule } from './shared-libs.module';
import { InMemoryStorage } from './storage/in-memory-storage';

export function translateHttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    SharedLibsModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: (translateHttpLoaderFactory), deps: [Http] }
    })
  ],
  providers: [
    InMemoryStorage
  ],
  exports: [
    TranslateModule
  ]
})
export class SharedCommonModule {
}
