import { NgModule } from '@angular/core';
import { TermsComponent } from './terms.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: TermsComponent,
    data: {
      pageTitle: 'Privacy and cookies policies',
      pageDescription: 'HyperSense Software has strict cookies and privacy policies ' +
          'in place. Learn more about how we protect client data here.',
      pageImage: 'assets/images/logo_image.png',
      bodyClass: 'home terms'
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
export class RoutingTermsModule { }
