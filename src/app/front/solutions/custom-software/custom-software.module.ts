import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingSolutionsCustomSoftwareModule } from './routing-solutions-cutom-software.module';
import { CustomSoftwareComponent } from './custom-software.component';
import {CoreModule} from '../../shared/core/core.module';
import {ShareModule} from '../../shared/share/share.module';



@NgModule({
  declarations: [
    CustomSoftwareComponent
  ],
  imports: [
    CommonModule,
    RoutingSolutionsCustomSoftwareModule,
    CoreModule,
    ShareModule
  ]
})
export class CustomSoftwareModule { }
