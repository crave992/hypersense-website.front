import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServicesComponent} from './services.component';

const routes: Routes = [
  {
    path: '', component: ServicesComponent,
    pathMatch: 'full',
    data: {
      pageTitle: 'Solutions for Node.js, mobile apps, and web development',
      pageDescription: 'Full-stack software development services: iOS apps, Android apps, ' +
          'Node.js and web, enterprise solutions, UI/UX design, QA, consultancy services, and DevOps.',

      pageImage: 'assets/images/logo_image.png',
      bodyClass: ''
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
export class RoutingServicesModule { }
