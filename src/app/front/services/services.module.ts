import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { RoutingServicesModule } from './routing-services.module';
import {CoreModule} from '../shared/core/core.module';
import {ShareModule} from '../shared/share/share.module';



@NgModule({
  declarations: [
    ServicesComponent
  ],
  imports: [
    CommonModule,
    RoutingServicesModule,
    CoreModule,
    ShareModule
  ]
})
export class ServicesModule { }
