import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'dev-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json', null);
  }

}
