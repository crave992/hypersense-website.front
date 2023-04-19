import {Injectable} from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state?: string;
    name?: string;
    type: string;
    icon?: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        type: 'divider'
    },
    {
        type: 'title',
        name: 'DASHBOARD'
    },
    {
        type: 'divider'
    },
    {
        state: 'users',
        name: 'USERS',
        type: 'sub',
        icon: 'fa-users',
        children: [
            {
                state: '',
                name: 'All users',
            },
            {
                state: 'create-user',
                type: 'link',
                name: 'Create user',
            },
        ]
    },
    {
        state: 'testimonials',
        name: 'TESTIMONIALS',
        type: 'sub',
        icon: 'fa-archive',
        children: [
            {
                state: '',
                name: 'All testimonials',
            },
            {
                state: 'create',
                name: 'Create testimonial',
            },
        ]
    },
    {
        state: 'projects',
        name: 'PROJECTS',
        type: 'sub',
        icon: 'fa-apple',
        children: [
            {
                state: '',
                name: 'All projects',
            },
            {
                state: 'create',
                name: 'Create project',
            },
        ]
    },
    {
        state: 'posts',
        name: 'BLOG',
        type: 'sub',
        icon: 'fa-book',
        children: [
            {
                state: '',
                name: 'All posts',
            },
            {
                state: 'create',
                name: 'Create blog post',
            },
        ]
    },
    {
        type: 'divider'
    },
    {
        type: 'title',
        name: 'APP'
    },
    {
        type: 'divider'
    },
    {
        name: 'Logout',
        icon: 'fa-close',
        type: 'logout',
    }
];

@Injectable()
export class MenuService {
    getAll(): Menu[] {
        return MENUITEMS;
    }
}

