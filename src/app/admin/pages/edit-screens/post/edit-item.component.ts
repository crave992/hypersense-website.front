import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditorItemComponent} from '../../../_modules/editor/editor-item/editor-item.component';
import {AwsStorageService} from '../../../_services/aws.storage.service';
import {formFields} from './item.edit.fields';
import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import {FieldConfig} from '../../../_modules/dynamic-form/models/field-config.interface';
import {AdminCategoriesService} from '../../../_services/crud_services/admin.categories.service';
import {ConfirmationDialogComponent} from '../../../common/confirmation-dialog/confirmation-dialog.component';
import {AdminPostsService} from '../../../_services/crud_services/admin.posts.service';
import {PostModel} from '../../../../front/_models/post.model';
import {PostCategoryModel} from '../../../../front/_models/postCategory.model';
import * as uuid from 'uuid';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-item.component.html',
    styleUrls: ['../../../_modules/editor/editor-item/editor-item.component.css', './edit-item.component.css']
})
export class EditPostComponent extends EditorItemComponent {
    base = 'blogs';
    itemName = 'Posts';
    itemCollectionUrl = 'posts';
    baseUrl = 'admin';
    bucketImage = 'blogs-assets';
    itemStatus = null;
    newImage = [];
    categories = [];
    folder;

    constructor(protected route: ActivatedRoute,
                protected formBuilder: FormBuilder,
                protected toastr: ToastService,
                protected itemService: AdminPostsService,
                protected modalService: NgbModal,
                protected awsService: AwsStorageService,
                protected adminCategoriesService: AdminCategoriesService,
    ) {
        super(route, formBuilder, toastr, itemService, modalService);
        this.currentItem = new PostModel();
        this.adminCategoriesService.adminFindItems()
            .subscribe(
                async (data) => {
                    if (data) {
                        data.response.map(
                            (category: PostCategoryModel) => {
                                this.categories.push({value: category.id, name: category.title});
                            }
                        );

                        this.formFields.map((item) => {
                            if (item.name === 'categories') {
                                item.options = this.categories;
                            }
                        });

                    }
                }
            );
    }

    formFields: FieldConfig[] = formFields;
    forSlug = 'title';

    confirmPublish() {

        const modalRef = this.modalService.open(ConfirmationDialogComponent, {
            windowClass: 'confirm-publish-modal'
        });

        modalRef.componentInstance.dialogTitle = 'Publish Post';
        modalRef.componentInstance.dialogText = 'Are you sure you want to publish this post?';
        modalRef.componentInstance.result.subscribe((result) => {

            modalRef.close();
            if (result) {
                this.createItemForm.controls.status.setValue(1);
                this.saveItem(); // status published
            }
        });
    }

    sidebarStatus(res) {
        this.openedSidebar = res;
        console.log(this.openedSidebar);
    }


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

        if (this.newImage.length > 0) {
            Promise.all(
                this.newImage.map(element => this.uploadImage(element)))
                .then(
                    res => {
                        console.log(res);
                        // eslint-disable-next-line @typescript-eslint/prefer-for-of
                        for (let i = 0; i < res.length; i++) {
                            this.createItemForm.get(this.newImage[i].name).setValue(res[i]);
                        }
                        this.saveFormValues();
                    }).catch(
                err => {
                    console.log(err);
                });

        } else {
            this.saveFormValues();
        }
        return;

    }


    uploadImage(element) {
        console.log(element);
        const today = new Date();
        const fileName = 'file_' + today.getTime() + '.jpg';
        const key = this.bucketImage + '/' + this.createItemForm.get('folder').value.trim().replace(/ /g, '-') + '/' + fileName;
        console.log("Key", key);
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
                            const tempValue = this.currentItem.categories;
                            if (tempValue) {
                                const newCategoryMap = tempValue.map(
                                    (item) => item.id
                                );
                                this.currentItem.categories = newCategoryMap;
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

    getNewImage(res) {
        if (res.file !== null) {
            this.newImage.push(res);
        }
    }


    setQuillFieldFolder() {
        this.formFields.map((item) => {
            if (item.type === 'quill') {
                item.parameters.imageBucket = this.bucketImage + '/' + this.folder;
            }
        });
    }

}

