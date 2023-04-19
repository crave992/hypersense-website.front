
import {Validators} from '@angular/forms';
import {FieldConfig} from '../../../_modules/dynamic-form/models/field-config.interface';

export const formFields: FieldConfig[] = [
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
        label: 'title',
        name: 'title',
        value: '',
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
        type: 'input',
        label: 'slug',
        name: 'slug',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'quill',
        label: 'Content',
        name: 'content',
        placeholder: '(Project Content)',
        validation: [{
            name: 'required',
            validator: Validators.required,
            message: 'Required Field'
        }, {
            name: 'minLength',
            validator: Validators.minLength(4),
            message: 'Field Length at least 4 characters'
        }],
        location: null,
        parameters: {imageBucket: 'blogs-assets', apiKey: 'blogs'}
    },
    {
        disabled: false,
        display: false,
        type: 'input',
        label: 'publishURLPath',
        name: 'publishURLPath',
        value: '',
        validation: null,
        location: null
    },

    {
        disabled: false,
        display: true,
        type: 'textarea',
        label: 'excerpt',
        name: 'excerpt',
        value: '',
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
        display: false,
        type: 'input',
        label: 'folder',
        name: 'folder',
        value: '',
        validation: null,
        location: null
    },

    {
        disabled: false,
        display: true,
        type: 'checkbox',
        label: 'Published?',
        name: 'status',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: false,
        type: 'input',
        label: 'duration',
        name: 'duration',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: false,
        type: 'input',
        label: 'userID',
        name: 'userID',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'image',
        label: 'imageURL',
        name: 'imageURL',
        value: '',
        validation: null,
        location: null,
    },
    {
        disabled: false,
        display: true,
        type: 'image',
        label: 'imageURLCard',
        name: 'imageURLCard',
        value: '',
        validation: null,
        location: null,
    },
    {
        disabled: false,
        display: true,
        type: 'select',
        label: 'categories',
        name: 'categories',
        value: '',
        options: [],
        multiple: true,
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'input',
        label: 'seoMetatitle',
        name: 'seoMetatitle',
        value: '',
        validation: null,
        location: 'seo'
    },
    {
        disabled: false,
        display: true,
        type: 'textarea',
        label: 'seoDescription',
        name: 'seoDescription',
        value: '',
        validation: null,
        location: 'seo'
    },
    {
        disabled: false,
        display: true,
        type: 'input',
        label: 'seoKeywords',
        name: 'seoKeywords',
        value: '',
        validation: null,
        location: 'seo'
    },
    {
        disabled: false,
        display: true,
        type: 'image',
        label: 'seoImageURL',
        name: 'seoImageURL',
        value: '',
        validation: null,
        location: 'seo'
    },
];

