import {Component, OnInit} from '@angular/core';
import {Angulartics2GoogleGlobalSiteTag} from 'angulartics2/gst';

@Component({
  selector: 'dev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private angulartics: Angulartics2GoogleGlobalSiteTag
  ) {

  }


  ngOnInit(): void {
    this.angulartics.startTracking();
  }

}
