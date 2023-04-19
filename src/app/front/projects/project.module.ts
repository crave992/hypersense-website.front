import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoutingProjectModule} from './routing-project.module';
import {LbsComponent} from './lbs/lbs.component';
import {SaraComponent} from './sara/sara.component';
import {DaydateComponent} from './daydate/daydate.component';
import {BeoutdareComponent} from './beoutdare/beoutdare.component';
import {PageComponent} from './page/page.component';
import {CoreModule} from '../shared/core/core.module';
import { ResenseComponent } from './resense/resense.component';
import {ShareModule} from '../shared/share/share.module';


@NgModule({
  declarations: [
    LbsComponent,
    SaraComponent,
    DaydateComponent,
    BeoutdareComponent,
    PageComponent,
    ResenseComponent
  ],
  imports: [
    CommonModule,
    RoutingProjectModule,
    CoreModule,
    ShareModule
  ]
})
export class ProjectModule { }
