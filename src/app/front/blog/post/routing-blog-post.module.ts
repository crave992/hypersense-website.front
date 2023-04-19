import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostComponent} from './post.component';

const routes: Routes = [
  {
    path: '', component: PostComponent,
    data: {
      pageTitle: null,
      pageDescription: '',
      bodyClass: 'blogItemPage',
      pageImage: 'assets/images/logo_image.png',
    }
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingBlogPostModule { }
