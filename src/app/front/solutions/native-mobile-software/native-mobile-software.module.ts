import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingSolutionsNativeModule } from './routing-solutions-native.module';
import { NativeMobileSoftwareComponent } from './native-mobile-software.component';
import {CoreModule} from '../../shared/core/core.module';
import {ShareModule} from '../../shared/share/share.module';




@NgModule({
  declarations: [
    NativeMobileSoftwareComponent
  ],
  imports: [
    CommonModule,
    RoutingSolutionsNativeModule,
    CoreModule,
    ShareModule
  ]
})
export class NativeMobileSoftwareModule { }
