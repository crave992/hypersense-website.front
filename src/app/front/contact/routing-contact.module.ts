import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '', component: ContactUsComponent,
    data: {
      pageTitle: 'Contact us via email, phone, or in person in Bucharest',
      pageDescription: 'Reach out to a HyperSense team member for help in bringing your next software project to life. Contact us digitally or in-person in Bucharest, Romania.',

      pageImage: 'assets/images/logo_image.png',
      bodyClass: 'home'
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
export class RoutingContactModule { }
