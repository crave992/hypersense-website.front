import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Filter} from '../interfaces/filter.interface';

@Component({
    selector: 'app-grid-search',
    templateUrl: './grid-search.component.html',
    styleUrls: ['./grid-search.component.css']
})
export class GridSearchComponent implements OnInit {
    @Input()
    filter: Filter;

    @Output()
    public click = new EventEmitter<MouseEvent>();

    constructor() {
    }

    ngOnInit() {
    }


    public startSearch(event: MouseEvent) {
        this.click.emit(event);
    }

}
