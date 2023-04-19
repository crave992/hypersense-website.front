import {Component, HostListener, OnInit} from '@angular/core';
import {SeoService} from './front/_services/seo.service';
import {Router, NavigationEnd} from '@angular/router';
declare let ga: any;
import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    public seoService: SeoService,
    private router: Router
  ) {

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 67) {
      if (typeof  window !== 'undefined') {
        const textSelect = window.getSelection().toString().trim();
        const substring = 'office@hypersense-software.com';
        if (textSelect.includes(substring)) {
          ga('send', {
            hitType: 'event',
            eventCategory: 'EmailCopy',
            eventAction: 'Copy',
            eventLabel: 'email copy'
          });
        }
      }
    }
  }

  ngOnInit(): void {
    this.seoService.set();

    if (typeof ga === 'function') {
      ga('create', environment.ga_code, 'auto');
      ga('send', 'pageview');
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        if (typeof ga === 'function') {
          ga('send', {
            hitType: 'pageview',
            page: event.urlAfterRedirects
          });
        }
      }
    });

  }
}
