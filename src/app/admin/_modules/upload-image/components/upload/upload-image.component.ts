import {
    Component,
    OnInit,
    Input,
    Output,
    ElementRef,
    ViewChild,
    HostListener,
    EventEmitter
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CropImageComponent} from '../crop/crop-image.component';
import {SettingsService} from '../../../../../front/_services/settings.service';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.css']
})

export class UploadImageComponent implements OnInit {
    @ViewChild('fileInput', {static: false})
    fileInput: ElementRef;

    @Input()
    config;

    @Input()
    group: FormGroup;

    @Input()
    initialValue: string;

    @Input()
    cropRatio: number;

    @Output()
    public newImage = new EventEmitter<object>();

    private file: File | null = null;
    public url;
    imageChangedEvent: any = '';
    modalRef;

    constructor(private host: ElementRef<HTMLInputElement>,
                private settingsService: SettingsService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        if (this.initialValue && this.initialValue.indexOf('http') !== 0) {
            this.settingsService.getFileStorageUrl()
                .then(res => {
                    if (res) {
                        this.url = res + '/' + this.initialValue;
                    } else {
                        this.url = this.initialValue;
                    }
                });
        } else {
            this.url = this.initialValue;
        }
    }


    @HostListener('change', ['$event'])
    emitFiles(event) {
        const fileList = event.target.files;
        const file = fileList && fileList.item(0);
        this.file = file;
        this.getImage(file);
    }

    uploadFile(event) {
        const element = event[0];
        this.file = element;
        this.getImage(element);
    }

    getImage(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (event: Event) => { // called once readAsDataURL is completed
            const url = (typeof reader.result === 'undefined') ? null : reader.result;
            this.modalRef = this.modalService.open(CropImageComponent, {
                backdrop : 'static',
                keyboard : false,
                centered: true,
                size: 'sm',
                windowClass: 'modal-crop'
            });
            this.modalRef.componentInstance.imageSource = url;
            this.modalRef.componentInstance.aspectRatio = this.cropRatio;

            this.modalRef.result.then((result) => {

                if (result && result.canvas) {
                    const aspectRatio = result.canvas.width / result.canvas.height;
                    this.url = result.canvas.toDataURL('image/jpeg');
                    result.canvas.toBlob((blobFile) => {
                        this.newImage.emit({file: blobFile, name: this.config.name, aspectRatio});
                    }, 'image/jpeg');
                }
            }, (reason) => {

            });
        };
    }

    deleteAttachment() {
        this.url = null;
        this.file = null;
        this.newImage.emit({file: null, name: this.config.name});
    }

    uploadImage() {
        this.fileInput.nativeElement.click();
    }

}
