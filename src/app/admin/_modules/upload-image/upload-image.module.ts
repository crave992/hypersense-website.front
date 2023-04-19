import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {UploadImageComponent} from './components/upload/upload-image.component';
import {CropImageComponent} from './components/crop/crop-image.component';
import {DragDropDirective} from './directive/dragdropdirective';


@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        UploadImageComponent,
        CropImageComponent,
        DragDropDirective
    ],
    exports: [
        UploadImageComponent,
        CropImageComponent,
        DragDropDirective
    ],
    entryComponents: [
        CropImageComponent
    ],
})

export class UploadImageModule {
}

