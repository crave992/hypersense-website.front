import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlutterComponent} from './flutter.component';

const routes: Routes = [
  {
    path: '', component: FlutterComponent,
    data: {
      pageTitle: 'Flutter - Mobile app development',
      pageDescription: 'HyperSense uses Flutter in order to provide a fast and complete development process for any project that needs to ship fast.',
      pageImage: 'assets/images/front/seo_flutter.png',
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
export class RoutingFlutterModule { }
