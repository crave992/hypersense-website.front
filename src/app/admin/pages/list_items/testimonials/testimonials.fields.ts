import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TestimonialsFields {
    public fieldList;

    constructor(public datepipe: DatePipe) {
        this.fieldList = [
            {name: 'id', label: 'ID', classc: 'd-none'},
            {name: 'sourceURL', label: 'Source URL', classc: 'd-none'},
            {name: 'source', label: 'Source', classc: ''},
            {name: 'name', label: 'Name', classc: ''},
            {name: 'src', label: 'Image', classc: 'd-none'},
            {name: 'location', label: 'Location', classc: ''},
            {name: 'title', label: 'title', classc: ''},
            {name: 'company', label: 'Company', classc: ''},
            {name: 'description', label: 'Description', classc: 'd-none'},
            {name: 'rank', label: 'Rank', classc: ''},
            {
                name: 'updatedAt', label: 'Updated At', classc: '', formatter: (item) => this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
            },
            {
                name: 'createdAt', label: 'Created At', classc: 'd-none', formatter: (item) => this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
            }];
    }

}

