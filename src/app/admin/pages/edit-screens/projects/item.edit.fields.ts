
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
        label: 'project',
        name: 'project',
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
        label: 'Content Left',
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
        parameters: {imageBucket: 'portfolios-assets', apiKey: 'portfolios'}
    },
    {
        disabled: false,
        display: true,
        type: 'quill',
        label: 'Content Right',
        name: 'contentRight',
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
        parameters: {imageBucket: 'portfolios-assets', apiKey: 'portfolios'}
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
        display: true,
        type: 'select',
        label: 'industry',
        name: 'industry',
        value: '',
        options: [
            {name: 'Business Intelligence', value: 'Business Intelligence'},
            {name: 'Healthcare & Fitness', value: 'Healthcare & Fitness'},
            {name: 'FinTech', value: 'FinTech'},
            {name: 'VoIP', value: 'VoIP'},
            {name: 'Enterprise', value: 'Enterprise'},
            {name: 'Healthcare', value: 'Healthcare'},
            {name: 'Automotive', value: 'Automotive'},
            {name: 'Lifestyle', value: 'Lifestyle'},
            {name: 'Ecommerce', value: 'Ecommerce'},
            {name: 'Games', value: 'Games'},
            {name: 'Image Processing', value: 'Image Processing'},
            {name: 'Fitness', value: 'Fitness'},
            {name: 'AR', value: 'AR'},
        ],
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'select',
        label: 'technologies',
        name: 'technologies',
        value: '',
        options: [
            {name: 'Android', value: 'Android'},
            {name: 'iOS', value: 'iOS'},
            {name: 'Angular', value: 'Angular'},
            {name: 'Node.js', value: 'Node.js'},
            {name: 'WordPress', value: 'WordPress'},
            {name: 'Wearables', value: 'Wearables'},
            {name: 'PHP', value: 'PHP'},
            {name: 'Flutter', value: 'Flutter'},
        ],
        multiple: true,
        validation: null,
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
        display: true,
        type: 'checkbox',
        label: 'CaseStudy?',
        name: 'caseStudy',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'checkbox',
        label: 'Display on homepage?',
        name: 'homepage',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'checkbox',
        label: 'Display on Custom Software?',
        name: 'software',
        value: '',
        validation: null,
        location: null
    },
    {
        disabled: false,
        display: true,
        type: 'checkbox',
        label: 'Display on Node Development?',
        name: 'node',
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
        display: false,
        type: 'input',
        label: 'backgroundGradientColors',
        name: 'backgroundGradientColors',
        value: '',
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

//
// id: 1
// title: "title"
// slug: "gggg"
// content: "<p>gggg</p>"

// backgroundGradientColors: null

//
// duration: 0
// excerpt: "gggg"
// folder: "development_PortfolioData_08b31388-a8a1-42fc-94a9-52b603f2778a"
//
// imageURL: null
// industry: "Business Intelligence"
// publishURLPath: null
// publishedAt: null
//
//
// status: 0
// technologies: null
//
//
// createdAt: 1573223836.239
// updatedAt: 1573223836.24
//
// user: {id: 2, avatarURL: null, role: "admin", facebookID: null,…}
// userID: 2
//
//
// seoDescription: null
// seoImageURL: null
// seoKeywords: null
// seoMetatitle: null
