import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminGuard} from './_guards/admin.guard';
import {AuthLayoutComponent} from './core';
import {AdminLayoutComponent} from './core';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {
    UsersComponent,
    TestimonialsComponent,
    ProjectsComponent
} from './pages/list_items';
import {EditTestimonialComponent} from './pages/edit-screens/testimonials/edit-item.component';
import {LayoutContentComponent} from './pages/edit-screens/layout-content.component';
import {EditProjectComponent} from './pages/edit-screens/projects/edit-item.component';
import {EditPostComponent} from './pages/edit-screens/post/edit-item.component';
import {PostsComponent} from './pages/list_items';
import {ReorderProjectComponent} from './pages/list_items/projects/reorder/reorder.component';

const routes: Routes = [
    {
        path: '', component: AdminLayoutComponent, data: {bodyClass: 'admin-area'},
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AdminGuard]},
            {
                path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard],
                data: {pageTitle: 'Admin Dashboard', bodyClass: 'admin-dashboard', pageRobots: 'noindex, nofollow'}
            },
            {
                path: 'users', component: UsersComponent, canActivate: [AdminGuard],
                data: {pageTitle: 'Users', pageRobots: 'noindex, nofollow'}
            },
            {
                path: 'testimonials', component: TestimonialsComponent, canActivate: [AdminGuard],
                data: {pageTitle: 'Testimonials', pageRobots: 'noindex, nofollow'}
            },
            {
                path: 'projects', component: ProjectsComponent, canActivate: [AdminGuard],
                data: {pageTitle: 'Projects', pageRobots: 'noindex, nofollow'},
            },
            {
                path: 'posts', component: PostsComponent, canActivate: [AdminGuard],
                data: {pageTitle: 'Posts', pageRobots: 'noindex, nofollow'}
            },
        ]
    },
    {
        path: 'reorder', component: AdminLayoutComponent, data: {bodyClass: 'admin-area reorder'},
        children: [
            {
                path: 'projects',
                component: ReorderProjectComponent,
                data: {
                    pageTitle: 'Admin Reorder Project', pageRobots: 'noindex, nofollow'
                },
                canActivate: [AdminGuard]
            },
        ]
    },
    {
        path: 'testimonials', component: LayoutContentComponent,
        children: [
            {
                path: 'create',
                component: EditTestimonialComponent,
                data: {
                    pageTitle: 'Admin Create Testimonial', bodyClass: 'create-item', pageRobots: 'noindex, nofollow'
                },
                canActivate: [AdminGuard]
            },
            {path: 'edit/:id', component: EditTestimonialComponent, canActivate: [AdminGuard]}
        ]
    },
    {
        path: 'projects', component: LayoutContentComponent,
        children: [
            {
                path: 'create',
                component: EditProjectComponent,
                data: {
                    pageTitle: 'Admin Create Project', bodyClass: 'create-item', pageRobots: 'noindex, nofollow'
                },
                canActivate: [AdminGuard]
            },
            {path: 'edit/:id', component: EditProjectComponent, canActivate: [AdminGuard], pathMatch: 'full'}
        ]
    },
    {
        path: 'posts', component: LayoutContentComponent,
        children: [
            {
                path: 'create',
                component: EditPostComponent,
                data: {
                    pageTitle: 'Admin Create Post', bodyClass: 'create-item', pageRobots: 'noindex, nofollow'
                },
                canActivate: [AdminGuard]
            },
            {path: 'edit/:id', component: EditPostComponent,
                data: {
                    pageTitle: 'Admin Edit Post',
                    pageRobots: 'noindex, nofollow'
                },
                canActivate: [AdminGuard],
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login', component: LoginComponent, canActivate: [AdminGuard],
                data: {pageTitle: 'Admin Login', bodyClass: 'admin-login', pageRobots: 'noindex, nofollow'}
            },
            {
                path: 'error',
                loadChildren: './error/error.module#ErrorModule'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'error/404'
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule {
}
