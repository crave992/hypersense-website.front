import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { RoutingProjectsModule } from './routing-projects.module';
import { CoreModule } from '../shared/core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ShareModule } from '../shared/share/share.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TinkaComponent } from './tinka/tinka.component';
import { CtcWalletComponent } from './ctc-wallet/ctc-wallet.component';
import { LbsManagerComponent } from './lbs-manager/lbs-manager.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    TinkaComponent,
    CtcWalletComponent,
    LbsManagerComponent
  ],
  imports: [
    CommonModule,
    RoutingProjectsModule,
    CoreModule,
    InfiniteScrollModule,
    ShareModule,
    NgbDropdownModule,
    FormsModule,
  ]
})
export class ProjectsModule { }
