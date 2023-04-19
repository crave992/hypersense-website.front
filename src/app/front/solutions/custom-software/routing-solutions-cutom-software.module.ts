import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomSoftwareComponent} from './custom-software.component';

const routes: Routes = [
  {
    path: '', component: CustomSoftwareComponent,
    pathMatch: 'prefix',
    data: {
      pageTitle: 'Custom software development for enterprises and startups.',
      pageDescription: 'We offer enterprises best-in-class BI, CMS, E-commerce, M-commerce, and resource planning services.',
      pageImage: 'assets/images/logo_image.png',
      bodyClass: 'home'
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
export class RoutingSolutionsCustomSoftwareModule { }
