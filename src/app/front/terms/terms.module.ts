import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { RoutingTermsModule } from './routing-terms.module';
import {CoreModule} from '../shared/core/core.module';




@NgModule({
  declarations: [
    TermsComponent
  ],
  imports: [
    CommonModule,
    RoutingTermsModule,
    CoreModule
  ]
})
export class TermsModule { }
