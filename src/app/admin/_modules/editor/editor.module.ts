import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {UploadImageModule} from '../upload-image/upload-image.module';
import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';

import {EditorHeaderComponent} from './editor-header/editor-header.component';
import {EditorItemComponent} from './editor-item/editor-item.component';
import {EditorSidebarComponent} from './editor-sidebar/editor-sidebar.component';
import {EditorWordsComponent} from './editor-words/editor-words.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UploadImageModule,
        DynamicFormModule
    ],
    declarations: [
        EditorHeaderComponent,
        EditorItemComponent,
        EditorSidebarComponent,
        EditorWordsComponent
    ],
    exports: [
        EditorHeaderComponent,
        EditorItemComponent,
        EditorSidebarComponent,
        EditorWordsComponent
    ],
    entryComponents: [
    ],
})

export class EditorModule {
}

