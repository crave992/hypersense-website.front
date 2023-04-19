import {ValidatorFn} from '@angular/forms';

export interface FieldConfig {
    disabled?: boolean;
    display?: boolean;
    label?: string;
    name: string;
    theme?: string;
    options?: { value: any; name: string }[];
    multiple?: boolean;
    counter?: boolean;
    placeholder?: string;
    type: string;
    validation?: ValidationConfig[];
    value?: any;
    location?: any;
    scrollingContainer?: any;
    modules?: any;
    parameters?: any;
}



export interface ValidationConfig {
    name: string;
    message: string;
    validator: ValidatorFn;
}
