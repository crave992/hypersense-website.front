import {Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-sara',
  templateUrl: './sara.component.html',
  styleUrls: ['./sara.component.scss']
})
export class SaraComponent implements OnInit {
  elementToRotate;
  constructor(
      @Inject(PLATFORM_ID) private platformId: any
  ) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    if (isPlatformBrowser(this.platformId)) {
      this.elementToRotate.style.transform = 'rotate(' + (window.pageYOffset / 4) + 'deg)';
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.elementToRotate = document.getElementById('animationImage');
    }

  }



}
