import {Component, ViewChild, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    options = {
        lang: 'en',
        theme: 'winter',
        settings: false,
        docked: false,
        boxed: false,
        opened: false
    };

    @Output()
    messageEvent = new EventEmitter<object>();
    @Output()
    toggleFullscreen = new EventEmitter<void>();

    constructor() {
    }

    sendMessage() {
        this.messageEvent.emit(this.options);
    }

    setTheme(theme) {
        this.options.theme = theme;
        this.sendMessage();
    }
}
