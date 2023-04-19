import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '', component: AboutComponent,
    data: {
      pageTitle: 'Full stack software development company',
      pageDescription: 'Bucharest-based full-stack software development. 16+ years of experience in iOS, Android, and web applications.',
      pageImage: 'assets/images/logo_image.png',
      bodyClass: ''
    },
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
export class RoutingAboutModule { }
