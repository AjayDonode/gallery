import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'add-comment-modal',
  templateUrl: './modal-comment.component.html',
})

//selector: 'create-gallery-modal-page',
export class ModalCommentComponent {
  name: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
 
  saveAndClose() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}