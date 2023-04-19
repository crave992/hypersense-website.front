import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-front-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() routerLink: any = '/';
  currentYear = (new Date()).getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
