import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateGalleryModalPage } from './create-gallery-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGalleryModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateGalleryModalPage],
  entryComponents: [CreateGalleryModalPage]
})
export class CreateGalleryPageModule {}
