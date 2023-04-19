import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RoutingAboutModule } from './routing-about.module';
import {CoreModule} from '../shared/core/core.module';
import {ShareModule} from '../shared/share/share.module';



@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RoutingAboutModule,
    CoreModule,
    ShareModule
  ]
})
export class AboutModule { }
