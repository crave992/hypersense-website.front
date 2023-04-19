import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {Field} from '../../models/field.interface';
import {FieldConfig} from '../../models/field-config.interface';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'form-select',
    styleUrls: ['form-select.component.css'],
    templateUrl: './form-select.component.html'
})
export class FormSelectComponent implements Field {
    config: FieldConfig;
    group: FormGroup;
}
