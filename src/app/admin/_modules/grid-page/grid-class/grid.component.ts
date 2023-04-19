import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import {ConfirmationDialogComponent} from '../../../common/confirmation-dialog/confirmation-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Filter} from '../interfaces/filter.interface';
import {AdminGenericService} from '../../../_services/helpers/admin.generic.service';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export  class GridComponent implements OnInit {
    searchEnabled = true;
    items = [];
    actions = [true, true, false]; // edit, delete, view
    filter: Filter = {};
    pageTitle = '';
    btnAddNewText = '';
    btnAddNewUrl = '';
    btnEditUrl = '';
    gridPaginationPrev = false;
    gridPaginationNext = false;
    base;
    fieldList;


    constructor(
        protected service: AdminGenericService,
        protected toastr: ToastService,
        protected modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        this.filter.limit = 10;
        this.filter.skip = 0;
       // this.filter.source = 0;
        this.filter.keyword = '';
        this.getItems();
    }

    getItems() {
        this.service.adminFindItems(this.base, this.filter).subscribe((res) => {
                if (res.error_code.code === '0') {
                    this.items = res.response;
                    this.gridPaginationPrev = (this.filter.skip === 0);
                    this.gridPaginationNext = (this.items.length < this.filter.limit);
                } else {
                    this.toastr.error(res.error_code.message);
                }
            });
    }

    nextPage() {
        this.filter.skip += this.filter.limit;
        this.getItems();
    }

    previousPage() {
        if (this.filter.skip > 0) {
            this.filter.skip -= this.filter.limit;
        }
        this.getItems();
    }

    removeItem(id) {
        this.service.removeItem(this.base, id)
            .subscribe(
                (data: any) => {
                    if (data.error_code.code === '0') {
                        this.toastr.success('Marked as removed');
                        for (let i = 0; i < this.items.length; i++) {
                            if (this.items[i].id === id) {
                                this.items.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        this.toastr.error(data.error_code.message);
                    }
                },
                (error: any) => {
                    this.toastr.error(error);
                }
            );
    }

    confirmDelete(id) {
        const modalRef = this.modalService.open(ConfirmationDialogComponent, {
            windowClass: 'confirm-delete-modal'
        });
        modalRef.componentInstance.dialogTitle = 'Confirm Delete Item';
        modalRef.componentInstance.dialogText = 'Are you sure you want to delete this item?';
        modalRef.result.then(data => {
            if (data === 'ok') {
                // delete component
                this.removeItem(id);
            }
        });
    }
}
