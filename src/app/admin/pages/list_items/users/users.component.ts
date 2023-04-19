import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import {GridComponent} from '../../../_modules/grid-page/grid-class/grid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdminClientusersService} from '../../../_services';
import {UserModel} from '../../../_models/user.model';
import {UsersFields} from './users.fields';

@Component({
    selector: 'app-users',
    templateUrl: '../../../_modules/grid-page/grid-class/grid.component.html',
    styleUrls: ['../../../_modules/grid-page/grid-class/grid.component.css']
})
export class UsersComponent extends GridComponent implements OnInit {
    items: UserModel[] = [];

    constructor(protected service: AdminClientusersService,
                protected toastr: ToastService,
                protected modalService: NgbModal,
                protected classConfig: UsersFields) {

        super(service, toastr, modalService);
        this.pageTitle = 'USERS';
        this.base = 'clientusers';
        this.btnAddNewText = 'Add new User';
        this.btnAddNewUrl = '/hs007admin/user/create';
        this.btnEditUrl = '/hs007admin/user/edit';
        this.fieldList = classConfig.fieldList;
    }


}

