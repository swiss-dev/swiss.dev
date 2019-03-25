import { Injectable } from '@angular/core';
import {fromEvent, Observable, Subscriber, Subscription} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class U2fService {

  private keys: string[] = [];
  private _otp: Subscription = fromEvent(document, 'keydown')
    .pipe(
      tap(event => this.handle(event as KeyboardEvent)),
      debounceTime(200)
    ).subscribe(() => {
      this.keys.splice(0, this.keys.length);
    });

  private subject: Observable<string> = new Observable<string>((subscriber) => {
    this.subscriber = subscriber;
  });
  private subscriber: Subscriber<string>;

  constructor() {
  }

  onEnter(): Observable<string> {
    return this.subject;
  }

  private handle(event: KeyboardEvent) {
    const keys = this.keys;
    if (event.key === 'Enter') {
      if (keys.length === 44) { this.subscriber.next(keys.reduce((a, b) => a += b, '')); }
    } else {
      this.keys.push(event.key);
      if (keys.length > 44) {
        keys.reverse();
        keys.pop();
        keys.reverse();
      }
    }
  }

}
