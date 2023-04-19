import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {DynamicFieldDirective} from './components/dynamic-field/dynamic-field.directive';
import {DynamicFormComponent} from './containers/dynamic-form/dynamic-form.component';

import {FormButtonComponent} from './components/form-button/form-button.component';
import {FormInputComponent} from './components/form-input/form-input.component';
import {FormSelectComponent} from './components/form-select/form-select.component';
import {FormCheckComponent} from './components/form-check/form-check.component';
import {FieldContainerComponent} from './components/field-container/field-container.component';
import {FormTextareaComponent} from './components/form-textarea/form-textarea.component';
import {FormQuillComponent} from './components/form-quill/form-quill.component';

import {QuillEditorComponent, QuillModule} from 'ngx-quill';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        MatOptionModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCheckboxModule
    ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent,
        FormCheckComponent,
        FieldContainerComponent,
        FormTextareaComponent,
        FormQuillComponent,
    ],
    exports: [
        DynamicFormComponent,
        FieldContainerComponent,
    ],
    entryComponents: [
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent,
        FormCheckComponent,
        FormTextareaComponent,
        FormQuillComponent,
        QuillEditorComponent,
    ],
})

export class DynamicFormModule {
}

