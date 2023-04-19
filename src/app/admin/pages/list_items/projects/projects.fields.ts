import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProjectsFields {
    public fieldList;

    constructor(public datepipe: DatePipe) {

        this.fieldList = [
            {name: 'id', label: 'ID', classc: 'd-none'},
            {name: 'folder', label: 'Folder', classc: ''},
            {name: 'title', label: 'title', classc: ''},
            {name: 'duration', label: 'duration', classc: ''},
            {name: 'userID', label: 'Name', classc: ''},
            {name: 'imageURL', label: 'Image', classc: 'd-none'},
            {name: 'industry', label: 'industry', classc: ''},
            {name: 'slug', label: 'slug', classc: ''},
            {name: 'status', label: 'Status', classc: ''},
            {name: 'technologies', label: 'technologies', classc: ''},
            {
                name: 'updatedAt', label: 'Updated At', classc: '', formatter: (item) => this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
            },
            {
                name: 'createdAt', label: 'Created At', classc: 'd-none', formatter: (item) => this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
            },
            {
                name: 'publishedAt', label: 'Published At', classc: 'd-none', formatter: (item) => this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
            }];
    }

}

