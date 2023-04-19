import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-grid-pagination',
    templateUrl: './grid-pagination.component.html',
    styleUrls: ['./grid-pagination.component.css']
})
export class GridPaginationComponent implements OnInit {
    @Input()
    gridPaginationPrev: boolean;

    @Input()
    gridPaginationNext: boolean;

    @Output()
    public clickPrev = new EventEmitter<MouseEvent>();

    @Output()
    public clickNext = new EventEmitter<MouseEvent>();

    constructor() {
    }

    ngOnInit() {
    }

    public prevPage(event: MouseEvent) {
        this.clickPrev.emit(event);
    }

    public nextPage(event: MouseEvent) {
        this.clickNext.emit(event);
    }

}
