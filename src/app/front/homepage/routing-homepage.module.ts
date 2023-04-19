import { NgModule } from '@angular/core';
import {HomepageComponent } from './homepage.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: HomepageComponent,
    data: {
      pageTitle: 'Node.js, app and website development - HyperSense Software',
      pageDescription: 'Full-service custom software company. Node.js solutions with Loopback/Angular, ' +
          'native iOS/Android apps with Swift/Kotlin, cross-platform apps with Flutter.',

      pageImage: 'assets/images/logo_image.png',
      bodyClass: 'home homePage'
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
export class RoutingHomepageModule { }
