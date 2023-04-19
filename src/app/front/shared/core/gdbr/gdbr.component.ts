import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-gdbr',
  templateUrl: './gdbr.component.html',
  styleUrls: ['./gdbr.component.scss']
})
export class GdbrComponent implements OnInit {
  show = false;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === '/terms') {
            this.show = false;
          } else {
            const check = localStorage.getItem('showGDBR');
            this.show = !check;
          }
        }
      });
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const check = localStorage.getItem('showGDBR');
      if (!check) {
        this.show = true;
      }
    }
  }

  async close() {
    if (isPlatformBrowser(this.platformId)) {
      await localStorage.setItem('showGDBR', 'false');
      this.show = false;
    }
  }
}
