import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import {CoreModule} from '../shared/core/core.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RoutingBlogModule} from './routing-blog.module';
import {ShareModule} from '../shared/share/share.module';
import { NoPostSearchResultsComponent } from './no-post-search-results/no-post-search-results.component';

@NgModule({
  declarations: [
    BlogComponent,
    NoPostSearchResultsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgbDropdownModule,
    FormsModule,
    InfiniteScrollModule,
    RoutingBlogModule,
    ShareModule
  ]
})
export class BlogModule { }
