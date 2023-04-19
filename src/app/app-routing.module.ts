import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { FrontComponent } from './front/layout/front.component';


const routes: Routes = [
  {
    path: 'hs007admin',
    data: {
      pageTitle: 'HYPERSENSE SOFTWARE | Dashboard', bodyClass: 'admin', pageRobots: 'noindex, nofollow'
    },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '', component: FrontComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./front/homepage/homepage.module').then(m => m.HomepageModule),
      },
      {
        path: 'enterprise-custom-software-development',
        pathMatch: 'full',
        loadChildren: () => import('./front/solutions/custom-software/custom-software.module').then(m => m.CustomSoftwareModule),
      },
      {
        path: 'native-mobile-app-development',
        pathMatch: 'full',
        loadChildren: () => import('./front/solutions/native-mobile-software/native-mobile-software.module')
            .then(m => m.NativeMobileSoftwareModule),
      },
      {
        path: 'node-development',
        pathMatch: 'full',
        loadChildren: () => import('./front/solutions/node-development/node-development.module').then(m => m.NodeDevelopmentModule),
      },
      {
        path: 'about',
        pathMatch: 'full',
        loadChildren: () => import('./front/about/about.module').then(m => m.AboutModule),
      },
      {
        path: 'services',
        pathMatch: 'full',
        loadChildren: () => import('./front/services/services.module').then(m => m.ServicesModule),
      },
      {
        path: 'contact',
        pathMatch: 'full',
        loadChildren: () => import('./front/contact/contact.module').then(m => m.ContactModule),
      },
      {
        path: 'portfolio',
        pathMatch: 'full',
        loadChildren: () => import('./front/projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('./front/projects/project.module').then(m => m.ProjectModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('./front/blog/blog.module').then(m => m.BlogModule),
      },
      {
        path: 'terms',
        loadChildren: () => import('./front/terms/terms.module').then(m => m.TermsModule),
      },
      {
        path: 'flutter-mobile-app-development',
        loadChildren: () => import('./front/flutter/flutter.module').then(m => m.FlutterModule),
      },
      {
        path: ':slug',
        loadChildren: () => import('./front/blog/post/post.module').then(m => m.PostModule),
      }
    ]
  },
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
        scrollPositionRestoration: 'enabled',
        onSameUrlNavigation: 'reload',
        initialNavigation: 'enabledBlocking',
        relativeLinkResolution: 'corrected'
    }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
