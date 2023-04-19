import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlutterComponent } from './flutter.component';
import {CoreModule} from '../shared/core/core.module';
import {RoutingFlutterModule} from './routing-flutter.module';
import {ShareModule} from '../shared/share/share.module';



@NgModule({
  declarations: [
    FlutterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RoutingFlutterModule,
    ShareModule
  ]
})
export class FlutterModule { }
