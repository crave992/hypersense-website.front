import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {ViewEncapsulation} from '@angular/core';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {BreakpointObserver} from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';

const SMALL_WIDTH_BREAKPOINT = 991;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private _router: Subscription;

  routeOptions: Options;
  isScreenSmall: Observable<boolean>;

  options = {
    lang: 'en',
    theme: 'simple',
    settings: false,
    docked: false,
    boxed: false,
    opened: false
  };

  currentLang = 'en';

  @ViewChild('sidebar', {static: false})
  sidebar;
  @ViewChild('sidemenu', {static: false})
  sidemenu;

  constructor(
    private _element: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    breakpoints: BreakpointObserver
  ) {
    this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
        .pipe(map(breakpoint => breakpoint.matches));

  }

  ngOnInit(): void {
    this._router = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(async (event: NavigationEnd) => {
        // Scroll to top on view load
        document.querySelector('.main-content').scrollTop = 0;
        if (await this.isScreenSmall.toPromise()) {
          this.sidemenu.close();
        }
        this.runOnRouteChange();
      });

    this.runOnRouteChange();
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      this.routeOptions = activeRoute.snapshot.data;
    });

  }



  receiveMessage($event) {
    this.options = $event;
  }

  toggleFullscreen(): void {
    const elem = this._element.nativeElement.querySelector('.main-content');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }
}
