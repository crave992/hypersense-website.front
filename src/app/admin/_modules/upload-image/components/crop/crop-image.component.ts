import {Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit} from '@angular/core';
import Cropper from 'cropperjs';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-crop-image',
    templateUrl: './crop-image.component.html',
    styleUrls: ['./crop-image.component.css']
})

export class CropImageComponent implements OnInit, AfterViewInit {
    @ViewChild('image', {static: false})
    public imageElement: ElementRef;

    @Input()
    public imageSource: string;

    @Input()
    public aspectRatio: number;

    public imageDestination: string;
    public imageDestinationBlob: any;
    private cropper: Cropper;


    public constructor(public activeModal: NgbActiveModal) {
        this.imageDestination = '';
        this.imageDestinationBlob = null;
    }

    public ngOnInit() {
    }

    public ngAfterViewInit() {
        this.cropper = new Cropper(this.imageElement.nativeElement, {
            zoomable: true,
            scalable: true,
            aspectRatio: this.aspectRatio ? this.aspectRatio : 2,
            dragMode: 'move',
            viewMode: 1,
            crop: () => {
                // const canvas = this.cropper.getCroppedCanvas();
                // // this.imageDestination = canvas.toDataURL('image/png');
                // this.imageDestination = canvas.toDataURL('image/jpeg');
                // canvas.toBlob((blobFile) => {
                //     this.imageDestinationBlob = blobFile;
                // }, 'image/jpeg');
            }
        });
    }

    public saveImage() {
        // const response = {image: this.imageDestination, imageBlob: this.imageDestinationBlob};
        const response = {canvas: this.cropper.getCroppedCanvas()};
        this.activeModal.close(response);
    }


}


