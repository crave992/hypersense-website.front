import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from '../../../common/confirmation-dialog/confirmation-dialog.component';
import {EditorItemComponent} from '../../../_modules/editor/editor-item/editor-item.component';
import {FieldConfig} from '../../../_modules/dynamic-form/models/field-config.interface';

import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import { TestimonialModel} from '../../../../front/_models/testimonial.model';
import {AdminGenericService} from '../../../_services/helpers/admin.generic.service';
import {formFields} from './item.edit.fields';

@Component({
    selector: 'app-edit-testimonial',
    templateUrl: './edit-item.component.html',
    styleUrls: ['../../../_modules/editor/editor-item/editor-item.component.css', './edit-item.component.css']
})
export class EditTestimonialComponent extends EditorItemComponent {
    base = 'testimonials';
    itemName = 'Testimonials';
    itemCollectionUrl = 'testimonials';
    baseUrl = 'admin';
    itemStatus = null;

    constructor(protected route: ActivatedRoute,
                protected formBuilder: FormBuilder,
                protected toastr: ToastService,
                protected itemService: AdminGenericService,
                protected modalService: NgbModal) {
        super(route, formBuilder, toastr, itemService, modalService);
        this.currentItem = new TestimonialModel();
    }

    formFields: FieldConfig[] = formFields;
    forSlug = null;

    confirmDelete() {
        const modalRef = this.modalService.open(ConfirmationDialogComponent, {
            windowClass: 'confirm-delete-modal'
        });

        modalRef.componentInstance.dialogTitle = 'Confirm Delete Item';
        modalRef.componentInstance.dialogText = 'Are you sure you want to delete this item?';
        modalRef.componentInstance.result.subscribe((result) => {
            if (result === true) {
                this.removeItem();
            }
        });
    }

    confirmPublish() {
    }

    sidebarStatus(res) {
        this.openedSidebar = res;
        console.log(this.openedSidebar);
    }


    saveItem() {
        this.createItemForm.markAllAsTouched();
        if (this.createItemForm.status === 'INVALID') {
            this.toastr.error('Invalid form data');
            return;
        }

        console.log(this.newImage);

        if (this.newImage.length > 0) {
            const formData = new FormData();
            formData.append('data', JSON.stringify(this.createItemForm.value));
            const today = new Date();
            const fileName = 'file_' + today.getTime() + '.jpg';

            formData.append('file', this.newImage[0].file, fileName);

            this.itemService.saveItemWithImage(this.base, formData)
                .subscribe(
                    (data: any) => {
                        if (data.error_code.code === '0') {
                            if (!this.createItemForm.get('id').value) {
                                this.createItemForm.controls.id.setValue(data.response.id);
                            }
                            this.toastr.success('Successfully saved!');
                            this.itemChanged = false;
                            setTimeout(() => window.location.href = 'hs007admin/' + this.itemCollectionUrl, 100);
                        } else {
                            this.toastr.error(data.error_code.message);
                        }
                    },
                    (error: any) => {
                        this.toastr.error(error);
                    }
                );
        } else {
            this.itemService.saveItem(this.base, this.createItemForm.value)
                .subscribe(
                    (data: any) => {
                        if (data.error_code.code === '0') {
                            if (!this.createItemForm.get('id').value) {
                                this.createItemForm.controls.id.setValue(data.response.id);
                            }
                            this.toastr.success('Successfully saved!');
                            this.itemChanged = false;
                            setTimeout(() => window.location.href = 'hs007admin/' + this.itemCollectionUrl, 100);
                        } else {
                            this.toastr.error(data.error_code.message);
                        }
                    },
                    (error: any) => {
                        this.toastr.error(error);
                    }
                );
        }


    }

    autosaveItem() {
    }

    getItem() {
        if (this.itemId) {
            this.itemService.adminGetItem(this.base, this.itemId)
                .subscribe((res: any) => {
                        if (res.error_code.code === '0') {
                            this.currentItem = res.response;
                            this.createItemForm.patchValue(this.createPatchValue(res.response), {emitEvent: false});
                            // this.itemHtml = res.response.description;
                            // if (this.currentEditor) {
                            //     this.currentEditor.clipboard.dangerouslyPasteHTML(this.itemHtml);
                            // }
                        }
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
        }

    }

}
