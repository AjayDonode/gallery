import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DisplayPage } from './display.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SocialSharing
],
  declarations: [DisplayPage]
})
export class DisplayPageModule {}
