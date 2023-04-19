import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminRoutingModule} from './admin-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/*quill*/
import {QuillEditorComponent, QuillModule} from 'ngx-quill';

import {
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    AdminLayoutComponent,
    AuthLayoutComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    SidebarComponent
} from './core';

import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';

/*Add/Edit items Components*/
import {EditPostComponent} from './pages/edit-screens/post/edit-item.component';
import {LayoutContentComponent} from './pages/edit-screens/layout-content.component';

/*uploadImage*/
import {UploadImageModule} from './_modules/upload-image/upload-image.module';
/*Grid pages*/
import {GridPageModule} from './_modules/grid-page/grid-page.module';
/*Editor*/
import {EditorModule} from './_modules/editor/editor.module';


/*reorder*/
import {ReorderProjectComponent} from './pages/list_items/projects/reorder/reorder.component';

import {
    UsersComponent,
    TestimonialsComponent,
    ProjectsComponent,
    PostsComponent,
} from './pages/list_items';


const LIST_ITEMS_PAGES = [
    UsersComponent,
    TestimonialsComponent,
    ProjectsComponent,
    ReorderProjectComponent,
    PostsComponent,
];

/*Dynamic Form*/
import {DynamicFormModule} from './_modules/dynamic-form/dynamic-form.module';

import {EditTestimonialComponent} from './pages/edit-screens/testimonials/edit-item.component';
import {EditProjectComponent} from './pages/edit-screens/projects/edit-item.component';

/*Services*/
import {AdminAuthService} from './_services/admin.auth.service';
import {AdminGuard} from './_guards/admin.guard';
import {AdminGenericService} from './_services/helpers/admin.generic.service';
import {AwsStorageService} from './_services/aws.storage.service';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {ConfirmationDialogComponent} from './common/confirmation-dialog/confirmation-dialog.component';
import {environment} from '../../environments/environment';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './_interceptors/error.interceptor';


@NgModule({
    declarations: [
        AccordionAnchorDirective,
        AccordionDirective,
        AccordionLinkDirective,
        AdminLayoutComponent,
        AuthLayoutComponent,
        FooterComponent,
        HeaderComponent,
        MenuComponent,
        SidebarComponent,
        LoginComponent,
        DashboardComponent,
        PostsComponent,
        EditTestimonialComponent,
        EditProjectComponent,
        EditPostComponent,
        LayoutContentComponent,
        ConfirmationDialogComponent,
        ...LIST_ITEMS_PAGES

    ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot(),
    DynamicFormModule,
    GridPageModule,
    EditorModule,
    UploadImageModule,
    NgbModule,
    MatSidenavModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
    entryComponents: [
        QuillEditorComponent,
    ],
    providers: [
        AdminGuard,
        AdminAuthService,
        AdminGenericService,
        AwsStorageService,
      {
        provide: RECAPTCHA_SETTINGS,
        useValue: {siteKey: environment.RECAPTCHA_key} as RecaptchaSettings,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      },
    ],
    bootstrap: []
})
export class AdminModule {
}
