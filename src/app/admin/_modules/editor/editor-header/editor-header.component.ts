import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-editor-header',
    templateUrl: './editor-header.component.html',
    styleUrls: ['./editor-header.component.css']
})
export class EditorHeaderComponent implements OnInit {
    public openedSidebar;

    @Input() itemName;
    @Input() itemCollectionUrl;
    @Input() baseUrl;
    @Input() haveClog: boolean;
    @Input() itemStatus;
    @Input() state: boolean;
    @Output() triggerSave: EventEmitter<any> = new EventEmitter();
    @Output() toggle = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    saveItem() {
        this.triggerSave.emit();
    }

    openSidebar() {
        this.state = !this.state;
        this.toggle.emit(this.state);
    }

}
