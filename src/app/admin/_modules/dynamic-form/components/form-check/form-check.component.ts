import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {Field} from '../../models/field.interface';
import {FieldConfig} from '../../models/field-config.interface';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'form-select',
    styleUrls: ['form-check.component.css'],
    templateUrl: './form-check.component.html'
})
export class FormCheckComponent implements Field {
    config: FieldConfig;
    group: FormGroup;

    changed(){
        console.log(this.group);
    }
}
