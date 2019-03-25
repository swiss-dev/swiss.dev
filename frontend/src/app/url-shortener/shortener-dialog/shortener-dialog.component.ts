import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {U2fService} from '../../u2f/u2f.service';
import {MatStep, MatStepper} from '@angular/material';
import {from, of, Subscription} from 'rxjs';
import {UrlShortenerService} from '../url-shortener.service';

@Component({
  selector: 'dev-shortener-dialog',
  templateUrl: './shortener-dialog.component.html',
  styleUrls: ['./shortener-dialog.component.scss']
})
export class ShortenerDialogComponent implements OnInit, OnDestroy {

  @ViewChild('identityStep')
  identityStep: MatStep;

  @ViewChild('stepper')
  stepper: MatStepper;

  loading = false;
  url = '';
  shortenedUrl: string;
  private u2fSubscription: Subscription;

  constructor(
    private u2f: U2fService,
    private shortener: UrlShortenerService
  ) { }

  ngOnInit() {
    this.u2fSubscription = this.u2f.onEnter().subscribe(token => {
      if (this.stepper.selected.label === this.identityStep.label) {
        console.log(token);
        this.loading = true;
        this.shortener.shorten(this.url, token).subscribe(res => {
          this.shortenedUrl = res.url;
          this.stepper.next();
          this.loading = false;
        });
      }
    });
  }

  submit() {
    if (!this.url) { return; }
    this.stepper.next();
  }

  ngOnDestroy(): void {
    this.u2fSubscription.unsubscribe();
  }

  copyUrl() {
    const copyToClipboard = str => {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    };
    copyToClipboard(this.shortenedUrl);
  }
}
