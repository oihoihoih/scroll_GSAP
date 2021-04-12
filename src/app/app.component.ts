import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public reachedTheEnd: boolean;

  constructor( private decimalPipe: DecimalPipe ) {}

  ngOnInit() {
    gsap.to('progress', {
      value: 100,
      scrollTrigger: {
        trigger: '.main',
        scrub: 0.3,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (options) => {
          if (options instanceof ScrollTrigger) {
            const value = Number(this.decimalPipe.transform(options.progress, '1.2-2'));
            console.log(value);
            this.reachedTheEnd = value > 0.93
          }
        }
      }
    })
  }

  onClick(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
