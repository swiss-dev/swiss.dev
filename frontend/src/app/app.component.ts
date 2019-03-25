import {Component, OnInit} from '@angular/core';
import {Angulartics2GoogleGlobalSiteTag} from 'angulartics2/gst';
import {OneSignalService} from './one-signal.service';

@Component({
  selector: 'dev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private angulartics: Angulartics2GoogleGlobalSiteTag,
    private oneSignal: OneSignalService
  ) {
  }


  ngOnInit(): void {
    this.angulartics.startTracking();
    this.oneSignal.init();
  }

}
