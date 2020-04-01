import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomateFolderComponent } from './automate-folder/automate-folder.component';

@NgModule({
  declarations: [AutomateFolderComponent],
  imports: [
    CommonModule
  ],
  exports: [AutomateFolderComponent]
})
export class AutomateFolderModule { }
