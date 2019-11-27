import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }, {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery/display/display.module').then(m => m.DisplayPageModule)
  },
  {
    path: 'addgallery',
    loadChildren: () =>
      import('./gallery/addgallery/addgallery.module').then(m => m.AddgalleryPageModule)
  },
  { path: 'display', loadChildren: './gallery/display/display.module#DisplayPageModule' },
  { path: 'modals', loadChildren: './gallery/modals/modals.module#ModalsPageModule' },
  { path: 'addgallery', loadChildren: './gallery/addgallery/addgallery.module#AddgalleryPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


