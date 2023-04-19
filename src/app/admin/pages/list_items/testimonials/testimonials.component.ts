import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import {GridComponent} from '../../../_modules/grid-page/grid-class/grid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AdminGenericService} from '../../../_services/helpers/admin.generic.service';
import {TestimonialModel} from '../../../../front/_models/testimonial.model';
import {TestimonialsFields} from './testimonials.fields';

@Component({
    selector: 'app-testimonials',
    templateUrl: '../../../_modules/grid-page/grid-class/grid.component.html',
    styleUrls: ['../../../_modules/grid-page/grid-class/grid.component.css']
})

export class TestimonialsComponent extends GridComponent implements OnInit {
    items: TestimonialModel[] = [];

    constructor(protected service: AdminGenericService,
                protected toastr: ToastService,
                protected modalService: NgbModal,
                protected classConfig: TestimonialsFields) {

        super(service, toastr, modalService);
        this.pageTitle = 'TESTIMONIALS';
        this.base = 'testimonials';
        this.btnAddNewText = 'Add new testimonial';
        this.btnAddNewUrl = '/hs007admin/testimonials/create';
        this.btnEditUrl = '/hs007admin/testimonials/edit';
        this.fieldList = classConfig.fieldList;
    }

}
