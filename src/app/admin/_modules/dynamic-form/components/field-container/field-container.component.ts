import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

import {FieldConfig} from '../../models/field-config.interface';

@Component({
    exportAs: 'fieldContainer',
    selector: 'app-field-container',
    template: `
        <ng-container
                dynamicField
                [config]="config"
                [quillConfig]="quillConfig"
                [group]="group">
        </ng-container>
    `
})

export class FieldContainerComponent implements OnInit {
    @Input()
    config: FieldConfig[] = [];

    @Input()
    group: FormGroup;

    @Input()
    quillConfig;

    constructor() {
    }

    ngOnInit() {
    }


}

