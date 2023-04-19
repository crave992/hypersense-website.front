import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RoutingBlogPostModule } from './routing-blog-post.module';
import { CoreModule } from '../../shared/core/core.module';
import { ShareModule } from '../../shared/share/share.module';

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    RoutingBlogPostModule,
    CoreModule,
    ShareModule
  ]
})
export class PostModule { }
