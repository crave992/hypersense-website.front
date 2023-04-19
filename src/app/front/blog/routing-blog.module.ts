import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from './blog.component';

const routes: Routes = [
  {
    path: '', component: BlogComponent,
    data: {
      pageTitle: 'Latest software development learnings, news, and articles',
      pageDescription: 'Tutorials, articles, and software-related news from a top mobile/web development company. ' +
          'Learn how HyperSense develops apps, the best bug fixes, and more.',
      pageImage: 'assets/images/logo_image.png',
      bodyClass: 'home blog'
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
export class RoutingBlogModule { }
