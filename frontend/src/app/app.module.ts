import {BrowserModule} from '@angular/platform-browser';
import {NgModule, SystemJsNgModuleLoader} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {HomeComponent} from './home/home.component';
import {EmailPickerModule} from './email-picker/email-picker.module';
import {Angulartics2Module} from 'angulartics2';
import {OneSignalService} from './one-signal.service';
import {KonamiModule} from './konami/konami.module';
import {MatDialogModule} from '@angular/material';
import {UrlShortenerModule} from './url-shortener/url-shortener.module';

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmailPickerModule,
    UrlShortenerModule,
    MatDialogModule,
    KonamiModule,
    Angulartics2Module.forRoot()
  ],
  providers: [OneSignalService, SystemJsNgModuleLoader],
  bootstrap: [AppComponent]
})
export class AppModule {
}
