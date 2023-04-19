import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-editor-sidebar',
    templateUrl: './editor-sidebar.component.html',
    styleUrls: ['./editor-sidebar.component.css']
})
export class EditorSidebarComponent implements OnInit {

    @Input()
    itemName;

    @Input()
    sidebarFields: any[];

    @Input()
    openedSidebar;

    @Input()
    createItemForm;

    @Output()
    closeSidebar = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    confirmPublish() {

    }

    confirmDelete() {
    }

    close() {
        this.openedSidebar = false;
        this.closeSidebar.emit(this.openedSidebar);
    }

    setOpenedClass() {
        return (this.openedSidebar ? 'settings-menu-container is-open' : 'settings-menu-container');
    }

}
