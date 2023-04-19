
import {Validators} from '@angular/forms';
import {FieldConfig} from '../../../_modules/dynamic-form/models/field-config.interface';

export const formFields: FieldConfig[] =  [
    {
        disabled: false,
        display: false,
        type: 'input',
        label: 'Id',
        name: 'id',
        value: null,
        validation: null,
        location: null,
    },
    {
        disabled: false,
        display: true,
        type: 'input',
        label: 'sourceURL',
        name: 'sourceURL',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'select',
        label: 'source',
        name: 'source',
        value: '',
        options: [{value: 'clutch', name: 'clutch'}, {value: 'google', name: 'google'}],
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'input',
        label: 'name',
        name: 'name',
        value: '',
        validation: [{
            name: 'required',
            validator: Validators.required,
            message: 'Required Field'
        }],
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'input',
        label: 'location',
        name: 'location',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'input',
        label: 'title',
        name: 'title',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'input',
        label: 'company',
        name: 'company',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'input',
        label: 'rank',
        name: 'rank',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'textarea',
        label: 'Description',
        name: 'description',
        placeholder: '(Testimonial Content)',
        validation: [{
            name: 'required',
            validator: Validators.required,
            message: 'Required Field'
        }, {
            name: 'minLength',
            validator: Validators.minLength(4),
            message: 'Field Length at least 4 characters'
        }],
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'image',
        label: 'image',
        name: 'src',
        value: '',
        validation: null,
        location: null,
    }
];
