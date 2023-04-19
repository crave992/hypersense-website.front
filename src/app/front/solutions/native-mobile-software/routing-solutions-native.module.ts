import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NativeMobileSoftwareComponent} from './native-mobile-software.component';

const routes: Routes = [
  {
    path: '', component: NativeMobileSoftwareComponent,
    pathMatch: 'full',
    data: {
      pageTitle: 'Mobile app development for iOS, Android and wearables',
      pageDescription: 'End-to-end native app development for your company. ' +
          'Superior UX interfaces for iOS and Android using Swift and Kotlin.',
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
export class RoutingSolutionsNativeModule { }
