import { Injectable } from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, Subject, Subscriber, Subscription} from 'rxjs';
import {debounceTime, subscribeOn, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KonamiService {

  private code: string[] =
    ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'a', 'b', 'Enter'];
  private keys: string[] = [];
  private _konami: Subscription = fromEvent(document, 'keydown')
      .pipe(
        tap(event => this.handle(event as KeyboardEvent)),
        debounceTime(1000)
      ).subscribe(() => {
      this.keys.splice(0, this.keys.length);
    });

  private subject: Observable<boolean> = new Observable<boolean>((subscriber) => {
    this.subscriber = subscriber;
  });
  private subscriber: Subscriber<boolean>;

  constructor() {
  }

  setCode(code: string[]) {
    this.code = code;
  }

  onCode(): Observable<boolean> {
    return this.subject;
  }

  private handle(event: KeyboardEvent) {
    const keys = this.keys;
    const code = this.code;
    this.keys.push(event.key);
    if (keys.length > code.length) {
      keys.reverse();
      keys.pop();
      keys.reverse();
    }
    if (keys.length === code.length) {
      for (let i = 0; i < code.length; i++) {
        if (keys[i] !== code[i]) {
          return;
        }
      }
      this.subscriber.next(true);
    }
  }

}
