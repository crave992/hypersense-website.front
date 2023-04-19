import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RoutingHomepageModule } from './routing-homepage.module';
import {CoreModule} from '../shared/core/core.module';
import {ShareModule} from '../shared/share/share.module';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RoutingHomepageModule,
    CoreModule,
    ShareModule
  ],
  providers: []
})
export class HomepageModule { }

