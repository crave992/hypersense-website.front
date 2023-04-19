import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-editor-words',
 //   templateUrl: './editor-words.component.html',
    template: `{{words}}`,
    styleUrls: ['./editor-words.component.css']
})
export class EditorWordsComponent implements OnInit {
    @Input()
    words;

    constructor() {
    }

    ngOnInit() {
    }

}
