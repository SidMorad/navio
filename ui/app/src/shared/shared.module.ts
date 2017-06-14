import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
export function httpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [Http] }
    })
  ],
  exports: [
    HttpModule,
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule {}