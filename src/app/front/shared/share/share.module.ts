import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsHomeComponent } from '../../common/testimonials-home/testimonials-home.component';
import { HeroImageComponent } from '../../common/hero-image/hero-image.component';
import { BuildSolutionsComponent } from '../../common/build-solutions/build-solutions.component';
import { ContactFormComponent } from '../../contact/contact-form/contact-form.component';
import { MessageSentComponent } from '../../common/message-sent/message-sent.component';
import { ProjectCardComponent } from '../../common/project-card/project-card.component';
import { CoreModule } from '../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CategoryPipe} from '../../_pipes/category.pipe';



@NgModule({
  declarations: [
    HeroImageComponent,
    BuildSolutionsComponent,
    TestimonialsHomeComponent,
    ContactFormComponent,
    MessageSentComponent,
    ProjectCardComponent,
    CategoryPipe
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeroImageComponent,
    BuildSolutionsComponent,
    TestimonialsHomeComponent,
    ContactFormComponent,
    MessageSentComponent,
    ProjectCardComponent,
    CategoryPipe
  ],
})
export class ShareModule { }
