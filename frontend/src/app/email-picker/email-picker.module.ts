import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailPickerComponent } from './email-picker.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [EmailPickerComponent],
  exports: [
    EmailPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EmailPickerModule { }
