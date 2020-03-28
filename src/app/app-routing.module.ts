import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard } from './services/auth.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login/login.module').then(m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./login/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  }, {
    path: 'gallery/:id',
    loadChildren: () =>
      import('./gallery/display/display.module').then(m => m.DisplayPageModule)
  },
  {
    path: 'addgallery/:id',
    loadChildren: () =>
      import('./gallery/addgallery/addgallery.module').then(m => m.AddgalleryPageModule)
  },
  {
    path: 'gallery/list',
    loadChildren: () =>
      import('./gallery/list/list.module').then(m => m.ListPageModule)
  },
  { path: 'display', loadChildren: './gallery/display/display.module#DisplayPageModule' },
  // { path: 'modals', loadChildren: './gallery/modals/modals.module#ModalsPageModule' },
  // { path: 'addgallery', loadChildren: './gallery/addgallery/addgallery.module#AddgalleryPageModule' },
  { path: 'list', loadChildren: './gallery/list/list.module#ListPageModule' },
  // { path: 'register', loadChildren: './login/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login/login.module#LoginPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
