import {Component, EventEmitter, Output, Input, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userName: string;
    @Input()
    heading: string;
    @Output()
    toggleSidenav = new EventEmitter<void>();

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.userName = 'anonymus';
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem('currentUser')) {
                const tempData = JSON.parse(localStorage.getItem('currentUser'));
                if (tempData && tempData.username) {
                    this.userName = tempData.username;
                }
            }
        }
    }

    ngOnInit() {

    }
}
