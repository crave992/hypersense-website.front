import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingSolutionsNodeModule } from './routing-solutions-node.module';
import { NodeDevelopmentComponent } from './node-development.component';
import { CoreModule } from '../../shared/core/core.module';
import {ShareModule} from '../../shared/share/share.module';

@NgModule({
  declarations: [
    NodeDevelopmentComponent
  ],
  imports: [
    CommonModule,
    RoutingSolutionsNodeModule,
    CoreModule,
    ShareModule
  ]
})
export class NodeDevelopmentModule { }
