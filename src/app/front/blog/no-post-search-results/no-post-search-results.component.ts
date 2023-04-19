import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-post-search-results',
  templateUrl: './no-post-search-results.component.html'
})
export class NoPostSearchResultsComponent implements OnInit {
  @Input() searchValue: string;

  constructor() { }

  ngOnInit(): void {
  }

}
