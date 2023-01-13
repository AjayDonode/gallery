import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalCommentComponent } from './modal-comment.component';

const routes: Routes = [
  {
    path: '',
    component: ModalCommentComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCommentComponent],
  entryComponents: [ModalCommentComponent]
})
export class ModalCommentComponentModule {}