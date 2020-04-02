import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomateFileComponent } from './automate-file/automate-file.component';
import { NgxMarkjsModule } from 'ngx-markjs';

@NgModule({
  declarations: [AutomateFileComponent],
  imports: [
    CommonModule,
    NgxMarkjsModule
  ],
  exports: [AutomateFileComponent]
})
export class AutomateFileModule { }
