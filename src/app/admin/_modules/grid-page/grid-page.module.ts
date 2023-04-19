import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {GridComponent} from './grid-class/grid.component';
import {GridPaginationComponent} from './grid-pagination/grid-pagination.component';
import {GridSearchComponent} from './grid-search/grid-search.component';
import {GridTitleComponent} from './grid-title/grid-title.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        GridComponent,
        GridPaginationComponent,
        GridSearchComponent,
        GridTitleComponent
    ],
    exports: [
        GridComponent,
        GridPaginationComponent,
        GridSearchComponent,
        GridTitleComponent
    ],
    entryComponents: [
    ],
})

export class GridPageModule {
}

