
import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class PostsFields {
    public fieldList;

    constructor(public datepipe: DatePipe) {
    // constructor() {

        this.fieldList = [
            {name: 'id', label: 'ID', classc: 'd-none'},
            {name: 'folder', label: 'Folder', classc: ''},
            {name: 'title', label: 'title', classc: ''},
            {name: 'userID', label: 'Name', classc: ''},
            {name: 'imageURL', label: 'Image', classc: 'd-none'},
            {name: 'slug', label: 'slug', classc: ''},
            {
                name: 'status', label: 'Status', classc: '',
                formatter: (item) => ((item === 1) ? 'published' : 'pending')
            },
            {name: 'publishURLPath', label: 'publishURLPath', classc: ''},
            {
                name: 'updatedAt', label: 'Updated At', classc: '', formatter: (item) =>
                     this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
                    // return 1;

            },
            {
                name: 'createdAt', label: 'Created At', classc: 'd-none', formatter: (item) =>
                     this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
                    // return 1;

            },
            {
                name: 'publishedAt', label: 'Published At', classc: 'd-none', formatter: (item) =>
                     this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
                    // return 1;

            }];
    }

}

