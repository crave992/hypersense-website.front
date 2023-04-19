import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-grid-title',
    templateUrl: './grid-title.component.html',
    styleUrls: ['./grid-title.component.css']
})
export class GridTitleComponent implements OnInit {
    @Input()
    title: string;

    @Input()
    addNewText = '';

    @Input()
    addNewUrl = '';

    constructor() {
    }

    ngOnInit() {

    }

}
