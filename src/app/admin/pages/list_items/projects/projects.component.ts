import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import {GridComponent} from '../../../_modules/grid-page/grid-class/grid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminProjectsService} from '../../../_services/crud_services/admin.projects.service';
import {ProjectModel} from '../../../../front/_models/project.model';
import {ProjectsFields} from './projects.fields';


@Component({
    selector: 'app-projects',
    templateUrl: 'grid.component.html',
    styleUrls: ['../../../_modules/grid-page/grid-class/grid.component.css', 'projects.component.css']
})

export class ProjectsComponent extends GridComponent implements OnInit {
    items: ProjectModel[] = [];

    constructor(protected service: AdminProjectsService,
                protected toastr: ToastService,
                protected modalService: NgbModal,
                protected classConfig: ProjectsFields) {

        super(service, toastr, modalService);
        this.pageTitle = 'PROJECTS';
        this.base = 'portfolios';
        this.btnAddNewText = 'Add new project';
        this.btnAddNewUrl = '/hs007admin/projects/create';
        this.btnEditUrl = '/hs007admin/projects/edit';
        this.fieldList = classConfig.fieldList;
        this.actions = [true, true, false]; // edit, delete, view
    }

}
