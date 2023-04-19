import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';

import { ToastsComponent } from './toasts/toasts.component';
import { GdbrComponent } from './gdbr/gdbr.component';
import { MenuComponent } from '../../layout/menu/menu.component';
import { TruncatePipe } from '../../_pipes/truncate.pipe';
import { SafeHtmlPipe } from '../../_pipes/safe-html.pipe';
import { ShimmerLoadingComponent } from '../../common/shimmer-loading/shimmer-loading.component';
import {ProjectCardLoadingComponent} from '../../common/project-card-loading/project-card-loading.component';
import {PostCardLoadingComponent} from '../../common/post-card-loading/post-card-loading.component';

@NgModule({
  declarations: [
    ToastsComponent,
    GdbrComponent,
    MenuComponent,
    TruncatePipe,
    SafeHtmlPipe,
    ShimmerLoadingComponent,
    ProjectCardLoadingComponent,
    PostCardLoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbToastModule,
    NgbCollapseModule,
    NgbDropdownModule,
    InlineSVGModule,
    ReactiveFormsModule
  ],
  exports: [
    ToastsComponent,
    GdbrComponent,
    MenuComponent,
    TruncatePipe,
    SafeHtmlPipe,
    InlineSVGModule,
    ShimmerLoadingComponent,
    ProjectCardLoadingComponent,
    PostCardLoadingComponent
  ]
})
export class CoreModule { }
