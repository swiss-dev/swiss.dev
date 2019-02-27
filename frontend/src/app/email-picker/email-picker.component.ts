import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'dev-email-picker',
  templateUrl: './email-picker.component.html',
  styleUrls: ['./email-picker.component.scss']
})
export class EmailPickerComponent implements OnInit {

  private readonly NAMES: string[] = [
    'carlo',
    'tobias',
    'mika'
  ];

  name = '';
  placeholder = '';
  private animating = false;
  private typed = null;

  constructor() { }

  ngOnInit() {

    this.typed = new Typed('#name', {
      strings: this.NAMES,
      attr: 'placeholder',
      bindInputFocusEvents: true,
      loop: true,
      typeSpeed: 2,
      backSpeed: 2,
    });
    // this.animate();
    // setInterval(() => this.animate(), 10000);

  }

  async animate() {

    if (this.animating) { return; }

    this.animating = true;

    for (const name of this.NAMES) {
      await this.printPlaceholder(name);
      await new Promise(res => setTimeout(res, 1000));
      await this.erasePlaceholder();
    }

    this.animating = false;

  }


  private async printPlaceholder(name: string) {
    let current = '';
    for (const char of name) {
      current += char;
      this.placeholder = current;
      await new Promise(res => setTimeout(res, 100));
    }
  }

  private async erasePlaceholder() {
    while (this.placeholder.length > 0) {
      this.placeholder = this.placeholder.slice(0, this.placeholder.length - 1);
      await new Promise(res => setTimeout(res, 100));
    }
  }
}
