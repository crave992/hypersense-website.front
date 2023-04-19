import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-hero-image',
    templateUrl: './hero-image.component.html',
    styleUrls: ['./hero-image.component.scss']
})
export class HeroImageComponent implements OnInit {
    @Input()
    childrenHtml: string;

    @Input()
    hiddenTopClients: boolean;

    constructor() {

    }

    ngOnInit() {
        if (typeof this.hiddenTopClients === 'undefined') {
            this.hiddenTopClients = false;
        }
    }


}
