import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [
    FormsModule,
    HttpModule,
    CommonModule
  ]
})
export class SharedLibsModule {}