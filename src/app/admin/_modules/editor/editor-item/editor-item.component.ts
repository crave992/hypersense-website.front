import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AdminGenericService} from '../../../_services/helpers/admin.generic.service';
import {ToastService} from '../../../../front/shared/core/toasts/toast.service';
import {FieldConfig} from '../../dynamic-form/models/field-config.interface';
import {ConfirmationDialogComponent} from '../../../common/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-base-post',
    template: '<div></div>'
})
export class EditorItemComponent implements OnInit, OnDestroy {
    public createItemForm: FormGroup;
    public currentItem;
    public itemChanged = false;
    public itemHtml = false;

    public itemId;
    public showMeta;
    public formFields: FieldConfig[] = null;
    public forSlug = null;
    public startLocation = null;
    public openedSidebar = false;

    public base;
    public newImage = [];

    constructor(
        protected route: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected toastr: ToastService,
        protected itemService: AdminGenericService,
        protected modalService: NgbModal
    ) {
        this.saveItem = this.saveItem.bind(this);
        this.popHandler = this.popHandler.bind(this);
        this.getItem = this.getItem.bind(this);

    }

    /*quill configuration*/
    quillConfig = {};

    ngOnDestroy() {
        window.removeEventListener('popstate', this.popHandler);
    }

    ngOnInit() {
        this.startLocation = location.pathname;
        history.pushState(null, document.title, this.startLocation);
        window.addEventListener('popstate', this.popHandler);

        /*create dynamic form from config */
        this.createItemForm = this.formBuilder.group({});
        this.controls.forEach(control => {
                this.createItemForm.addControl(control.name, this.createControl(control));
            }
        );

        /*end create dynamic form*/
        this.route.params.subscribe(params => {
            if (params && (typeof params.id !== 'undefined')) {
                this.itemId = params.id;
                this.getItem();
            } else {
                this.getEmptyItem();
            }
        });

        /*listener for autosave*/
        this.createItemForm.valueChanges.pipe(
            debounceTime(2000),
            distinctUntilChanged(),
        ).subscribe(val => {
            this.autosaveItem();
        });

        /*create slug*/
        if (this.forSlug) {
            this.createItemForm.get(this.forSlug).valueChanges.pipe(
                debounceTime(1000),
                distinctUntilChanged(),
            ).subscribe(val => {
                if (val) {
                    this.createSlug(val);
                }
            });
        }

        /*listener for mark form as changed*/
        this.createItemForm.valueChanges.pipe(
            distinctUntilChanged(),
        ).subscribe(val => {
            this.itemChanged = true;
        });

    }

    createSlug(processedName) {
        processedName = processedName
            .toLowerCase()
            .replace(/[\W_-]+/g, '-')
            .replace(/-+/g, '-');
        if (!this.createItemForm.controls.slug.value) {
            this.createItemForm.controls.slug.setValue(processedName);
        }
    }

    createPatchValue(response) {
        const patchV = {};
        this.controls.forEach(control => {
                patchV[control.name] = (typeof response[control.name] !== 'undefined' && response[control.name]) ?
                    response[control.name] : null;
            }
        );
        return patchV;
    }

    createControl(config: FieldConfig) {
        const valid = this.bindValidations(config.validation || []);
        const {disabled, value} = config;
        return this.formBuilder.control({disabled, value}, valid);
    }

    bindValidations(validations: any) {
        if (validations.length > 0) {
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }


    isOpened(event) {
        console.log(event);
    }

    /*start Dynamic Form from config*/
    get controls() {
        return this.formFields.filter(({type}) => type !== 'button');
    }

    get changes() {
        return this.createItemForm.valueChanges;
    }

    get valid() {
        return this.createItemForm.valid;
    }

    get value() {
        return this.createItemForm.value;
    }

    popHandler() {
        if (this.itemChanged) {
            if (confirm('Are you sure to leave?')) {
                window.removeEventListener('popstate', this.popHandler);
                window.history.back();
            } else {
                history.pushState(null, document.title, this.startLocation);
            }
        } else {
            window.removeEventListener('popstate', this.popHandler);
            window.history.back();
        }
    }

    /*abstract functions*/
    confirmDelete() {
        const modalRef = this.modalService.open(ConfirmationDialogComponent, {
            windowClass: 'confirm-delete-modal'
        });
        modalRef.componentInstance.dialogTitle = 'Confirm Delete';
        modalRef.componentInstance.dialogText = 'Are you sure you want to delete this?';
        modalRef.componentInstance.result.subscribe((result) => {
            if (result === true) {
                this.removeItem();
            }
        });
    }

    /*general functions*/
    fromFunction$(factory: () => any) {
        return Observable.create((observer) => {
            try {
                observer.next(factory());
                observer.complete();
            } catch (error) {
                observer.error(error);
            }
        });
    }


    @HostListener('window:beforeunload', ['$event'])
    @HostListener('window:pagehide', ['$event'])
    messageUnload($event) {
        if (this.itemChanged) {
            return false;
        }
    }

    fieldsByLocation(location = null) {
        return this.controls.filter(control => control.location === location);
    }

    saveItem() {
    }

    autosaveItem() {
    }

    removeItem() {
        this.itemService.removeItem(this.base, this.currentItem.id)
            .subscribe(
                (data: any) => {
                    if (data.error_code.code === '0') {
                        this.toastr.success('Marked as removed');
                    } else {
                        this.toastr.error(data.error_code.message);
                    }
                }
            );
    }

    getItem() {
    }

    getEmptyItem() {
    }

    getNewImage(res) {
        console.log(res);
        console.log(this.newImage);
        let temp = [];
        if (res.file) {
            let found = false;
            temp = this.newImage.map(
                item => {
                    if (item.name === res.name) {
                        item.file = res.file;
                        found = true;
                    }
                    return item;
                }
            );

            if (!found) {
                temp.push(res);
            }
        } else {
            // delete
            temp = this.newImage.filter(
                item => (item.name !== res.name)
            );
        }
        this.newImage = temp;
    }
}
