import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import {GridComponent} from '../../../_modules/grid-page/grid-class/grid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminPostsService} from '../../../_services/crud_services/admin.posts.service';
import { PostModel } from '../../../../front/_models/post.model';
import {PostsFields} from './posts.fields';
import {DatePipe} from '@angular/common';


@Component({
    selector: 'app-posts',
    templateUrl: '../../../_modules/grid-page/grid-class/grid.component.html',
    styleUrls: ['../../../_modules/grid-page/grid-class/grid.component.css'],
})


export class PostsComponent extends GridComponent implements OnInit {
    items: PostModel[] = [];

    constructor(
      protected service: AdminPostsService,
      protected toastr: ToastService,
      protected modalService: NgbModal,
      classConfig: PostsFields
    ) {
        super(service, toastr, modalService);
        this.pageTitle = 'POSTS';
        this.base = 'blogs';
        this.btnAddNewText = 'Add new post';
        this.btnAddNewUrl = '/hs007admin/posts/create';
        this.btnEditUrl = '/hs007admin/posts/edit';
        this.fieldList = classConfig.fieldList;
    }

}





