import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShortenerDialogComponent} from './shortener-dialog/shortener-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatStepperModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {U2fModule} from '../u2f/u2f.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  declarations: [ShortenerDialogComponent],
  exports: [ShortenerDialogComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule,
    ClipboardModule,
    MatIconModule,
    U2fModule,
    MatStepperModule,
    FlexLayoutModule
  ],
  entryComponents: [ShortenerDialogComponent]
})
export class UrlShortenerModule { }
