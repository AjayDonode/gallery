import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'stars',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../stars/star.module').then(m => m.StarPageModule)
          }
        ]
      },
      {
        path: 'likes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../likes/likes.module').then(m => m.LikesPageModule)
          }
        ]
      }
    ]
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
