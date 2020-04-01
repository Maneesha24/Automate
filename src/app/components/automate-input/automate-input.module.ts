import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomateInputComponent } from './automate-input/automate-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutomateInputComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [AutomateInputComponent]
})
export class AutomateInputModule { }
