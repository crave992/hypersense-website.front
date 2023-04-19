import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UsersFields {
    public fieldList;

    constructor(public datepipe: DatePipe) {
        this.fieldList = [
            {name: 'id', label: 'ID', classc: 'd-none'},
            {name: 'username', label: 'Username', classc: ''},
            {name: 'email', label: 'Email', classc: ''},
            {name: 'role', label: 'Role', classc: ''},
            {
                name: 'updatedAt', label: 'Updated At', classc: '', formatter: (item) => this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
            },
            {
                name: 'createdAt', label: 'Created At', classc: 'd-none', formatter: (item) => this.datepipe.transform(new Date(item * 1000), 'dd MMM yyyy')
            }];
    }

}

