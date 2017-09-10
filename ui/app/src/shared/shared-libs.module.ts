import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingBarHttpModule,
    HttpModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    LoadingBarHttpModule,
    HttpModule
  ]
})
export class SharedLibsModule { }
