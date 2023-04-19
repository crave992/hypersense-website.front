import {Component, ElementRef, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {Field} from '../../models/field.interface';
import {FieldConfig} from '../../models/field-config.interface';

@Component({
    selector: 'form-textarea',
    styleUrls: ['form-textarea.component.css'],
    templateUrl: 'form-textarea.component.html'
})
export class FormTextareaComponent implements Field {
    config: FieldConfig;
    group: FormGroup;

    counter() {
        return this.group.value[this.config.name] ? this.group.value[this.config.name].length : 0;
    }
}
