import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomateFileComponent } from './automate-file/automate-file.component';

@NgModule({
  declarations: [AutomateFileComponent],
  imports: [
    CommonModule
  ],
  exports: [AutomateFileComponent]
})
export class AutomateFileModule { }
