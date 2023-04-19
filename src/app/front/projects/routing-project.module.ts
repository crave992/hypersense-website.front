import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeoutdareComponent } from './beoutdare/beoutdare.component';
import { SaraComponent } from './sara/sara.component';
import { DaydateComponent } from './daydate/daydate.component';
import { LbsComponent } from './lbs/lbs.component';
import { PageComponent } from './page/page.component';
import {ResenseComponent} from './resense/resense.component';
import {TinkaComponent} from './tinka/tinka.component';
import {CtcWalletComponent} from './ctc-wallet/ctc-wallet.component';
import {LbsManagerComponent} from './lbs-manager/lbs-manager.component';

const routes: Routes = [
  {
    path: 'beoutdare',
    component: BeoutdareComponent,
    data: {
      pageTitle: 'Our responsive Angular.js/Node.js app for Be Outdare ',
      pageDescription: 'HyperSense created an all-in-one solution for Be Outdare, a sports startup, building both a back-end database and front-end app/website with Node.js/Angular.',
      pageImage: 'assets/images/logo_image.png',
      bodyClass: 'home beoutdare'
    }
  },
  {
    path: 'sara-event-angular-animated-website',
    component: SaraComponent,
    data: {
      pageTitle: 'Our presentation website for Sara Events',
      pageDescription: 'HyperSense worked with Sara Events to develop an elegant website with a lightning-fast Google Page Speed score and lightweight serverless hosting on AWS.',
      pageImage: 'assets/images/logo_image.png',
      bodyClass: 'home sara'
    }
  },
  {
    path: 'daydate-online-dating-native-mobile-app',
    component: DaydateComponent,
    data: {
      pageTitle: 'Our native mobile app for DayDate',
      pageDescription: 'HyperSense worked with DayDate to develop a native mobile dating app including chat, social media integration with Facebook and Yelp, and in-app purchases.',
      pageImage: 'assets/images/logo_image.png',
      bodyClass: 'home daydate'
    }
  },
  {
    path: 'ios_and_android_background_location_tracking',
    component: LbsComponent,
    data: {
      pageTitle: 'Our iOS and Android location-tracking app for LBS Edge Suite',
      pageDescription: 'HyperSense built LBS Edge Suite, a native iOS/Android app to track GPS location data while maintaining the best balance between accuracy and battery usage.',
      bodyClass: 'home lbs',
      pageImage: 'assets/images/logo_image.png',
    }
  },
  {
    path: 'resense',
    component: ResenseComponent,
    data: {
      pageTitle: '',
      pageDescription: '',
      bodyClass: 'home',
      pageImage: 'assets/images/logo_image.png',
    }
  },
  {
    path: 'CTC-Wallet-transport-flutter-mobile-app',
    component: CtcWalletComponent,
    data: {
      pageTitle: '',
      pageDescription: '',
      bodyClass: 'home',
      pageImage: 'assets/images/logo_image.png',
    }
  },
  {
    path: 'LBS-Manager-transport-flutter-mobile-app',
    component: LbsManagerComponent,
    data: {
      pageTitle: '',
      pageDescription: '',
      bodyClass: 'home',
      pageImage: 'assets/images/logo_image.png',
    }
  },
  {
    path: 'tinka-fintech-flutter-mobile-app',
    component: TinkaComponent,
    data: {
      pageTitle: '',
      pageDescription: '',
      pageImage: 'assets/images/logo_image.png'
    }
  },
  {
    path: ':slug', component: PageComponent,
    data: {
      pageTitle: null,
      pageDescription: null,
      pageImage: 'assets/images/logo_image.png',
      bodyClass: null
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
export class RoutingProjectModule { }
