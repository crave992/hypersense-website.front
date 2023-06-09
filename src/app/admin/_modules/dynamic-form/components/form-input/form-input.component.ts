import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {Field} from '../../models/field.interface';
import {FieldConfig} from '../../models/field-config.interface';


@Component({
    selector: 'form-input',
    styleUrls: ['form-input.component.css'],
    templateUrl: 'form-input.component.html'
})
export class FormInputComponent implements Field {
    config: FieldConfig;
    group: FormGroup;
}
