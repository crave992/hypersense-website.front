import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../../../front/shared/core/toasts/toast.service';
import {GridComponent} from '../../../../_modules/grid-page/grid-class/grid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminProjectsService} from '../../../../_services/crud_services/admin.projects.service';
import {ProjectModel} from '../../../../../front/_models/project.model';
import {ProjectsFields} from './projects.fields';

@Component({
    selector: 'app-reorder-projects',
    templateUrl: './reorder.component.html',
    styleUrls: ['../../../../_modules/grid-page/grid-class/grid.component.css', './reorder.component.css']
})

export class ReorderProjectComponent extends GridComponent implements OnInit {
    items: ProjectModel[] = [];
    dragItem;

    constructor(
        protected service: AdminProjectsService,
        protected toastr: ToastService,
        protected modalService: NgbModal,
        protected classConfig: ProjectsFields
    ) {

        super(service, toastr, modalService);
        this.pageTitle = 'Reorder PROJECTS';
        this.base = 'portfolios';
        this.btnAddNewText = '';
        this.btnAddNewUrl = '';
        this.btnEditUrl = '';
        this.fieldList = classConfig.fieldList;
        this.actions = [];
        this.searchEnabled = false;

    }


    ngOnInit() {
        this.filter.limit = 10000000000;
        this.filter.skip = 0;
        this.filter.keyword = '';
        this.getItems();
    }

    drag(ev) {
        this.dragItem = ev.target;
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drop(ev) {
        ev.preventDefault();
        const target = ev.target.parentElement;

        const order = target.getAttribute('data-order');
        const drgItem = this.dragItem.getAttribute('data-id');
        const data = {order, id: drgItem};

        this.changeOrder(data);
        console.log(data);
    }


    changeOrder(newOrder) {
        this.service.adminChangeOrder(this.base, newOrder)
            .subscribe(
                (data: any) => {
                    if (data.error_code.code === '0') {
                        this.getItems();
                    } else {
                        this.toastr.error(data.error_code.message);
                    }
                }
            );
    }
}
