import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './projects.component';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent,
    data: {
      pageTitle: 'Delivered projects for iOS, Android, and web',
      pageDescription: 'Take a look at our latest featured projects, including our most recent iOS and Android mobile apps, Node.js work, and UI/UX designs.',
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
export class RoutingProjectsModule { }
