import { Component, OnInit } from '@angular/core';
declare let ga: any;

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clickEmail(): void {
    if (typeof  ga !== 'undefined') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'EmailClick',
        eventAction: 'Click',
        eventLabel: 'email click'
      });
    }
  }

}
