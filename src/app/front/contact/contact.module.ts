import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CoreModule } from '../shared/core/core.module';
import { RoutingContactModule } from './routing-contact.module';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import { GoogleMapsModule } from '@angular/google-maps';
import {ShareModule} from '../shared/share/share.module';


@NgModule({
  declarations: [
    ContactUsComponent,
  ],
  imports: [
    CommonModule,
    RoutingContactModule,
    CoreModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    GoogleMapsModule,
    ShareModule
  ]
})
export class ContactModule { }
