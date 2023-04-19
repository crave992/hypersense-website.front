import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NodeDevelopmentComponent} from './node-development.component';

const routes: Routes = [
  {
    path: '', component: NodeDevelopmentComponent,
    pathMatch: 'full',
    data: {
      pageTitle: 'Node.js - Angular, Loopback and Express solutions',
      pageDescription: 'Node.js (Angular, Loopback, Express) software solutions for businesses and startups.',
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
export class RoutingSolutionsNodeModule { }
