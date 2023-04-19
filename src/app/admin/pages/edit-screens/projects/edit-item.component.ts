import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {EditorItemComponent} from '../../../_modules/editor/editor-item/editor-item.component';
import {FieldConfig} from '../../../_modules/dynamic-form/models/field-config.interface';
import * as uuid from 'uuid';
import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import {AdminProjectsService} from '../../../_services/crud_services/admin.projects.service';
import {AwsStorageService} from '../../../_services/aws.storage.service';

import {ProjectModel} from '../../../../front/_models/project.model';
import {formFields} from './item.edit.fields';


@Component({
    selector: 'app-edit-testimonial',
    templateUrl: './edit-item.component.html',
    styleUrls: ['../../../_modules/editor/editor-item/editor-item.component.css', './edit-item.component.css']
})
export class EditProjectComponent extends EditorItemComponent {
    base = 'portfolios';
    itemName = 'Projects';
    itemCollectionUrl = 'projects';
    baseUrl = 'admin';
    bucketImage = 'portfolios-assets';
    itemStatus = null;
    folder;

    constructor(protected route: ActivatedRoute,
                protected formBuilder: FormBuilder,
                protected toastr: ToastService,
                protected itemService: AdminProjectsService,
                protected modalService: NgbModal,
                protected awsService: AwsStorageService,
    ) {
        super(route, formBuilder, toastr, itemService, modalService);
        this.currentItem = new ProjectModel();
    }

    formFields: FieldConfig[] = formFields;
    forSlug = 'title';

    private saveFormValues() {
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
                }
            );
    }

    saveItem() {
        this.createItemForm.markAllAsTouched();
        if (this.createItemForm.status === 'INVALID') {
            this.toastr.error('Invalid form data');
            return;
        }

        /*parse multiple select values*/
        let tempValue = this.createItemForm.get('technologies').value;
        if (typeof tempValue === 'string') {
            tempValue = tempValue.split(',');
            this.createItemForm.get('technologies').setValue(tempValue);
        }

        if (this.newImage.length > 0) {
            console.log(this.newImage);
            Promise.all(
                this.newImage.map(element => this.uploadImage(element)))
                .then(
                    res => {
                        console.log(res);
                        // eslint-disable-next-line @typescript-eslint/prefer-for-of
                        for (let i = 0; i < res.length; i++) {
                            this.createItemForm.get(this.newImage[i].name).setValue(res[i]);
                            if (this.createItemForm.get('aspectRatio')) {
                                this.createItemForm.get('aspectRatio').setValue(this.newImage[i].aspectRatio);
                            }
                        }
                        this.saveFormValues();
                    }).catch(
                err => {
                    console.log(err);
                });

        } else {
            this.saveFormValues();
        }


    }

    uploadImage(element) {
        console.log(element);
        const today = new Date();
        const fileName = 'file_' + today.getTime() + '.jpg';
        const key = this.bucketImage + '/' + this.createItemForm.get('folder').value.trim().replace(/ /g, '-') + '/' + fileName;
        return this.awsService.getAwsLinkAndUpload(key, element.file, this.base);
    }

    autosaveItem() {
    }

    getItem() {
        if (this.itemId) {
            this.itemService.adminGetItem(this.base, this.itemId)
                .subscribe((res: any) => {
                        if (res.error_code.code === '0') {
                            this.currentItem = res.response;
                            this.folder = res.response.folder;
                            /*multiple select*/
                            let tempValue = this.currentItem.technologies;
                            if (typeof tempValue === 'string') {

                                tempValue = JSON.parse(tempValue);
                                this.currentItem.technologies = tempValue;
                                res.response.technologies = tempValue;
                            }
                            this.setQuillFieldFolder();
                            this.createItemForm.patchValue(this.createPatchValue(res.response), {emitEvent: true});
                        }
                    }
                );
        }
    }


    getEmptyItem() {
        this.folder = uuid.v4();
        this.setQuillFieldFolder();
        this.createItemForm.controls.folder.setValue(this.folder);
    }

    setQuillFieldFolder() {
        this.formFields.map((item) => {
            if (item.type === 'quill') {
                item.parameters.imageBucket = this.bucketImage + '/' + this.folder;
            }
        });
    }

}
