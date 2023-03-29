import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateGalleryModalPage } from '../gallery/list/create-gallery-modal/create-gallery-modal.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public modalController: ModalController) {}

  async createNewGallery() {
    const modal = await this.modalController.create({
      component: CreateGalleryModalPage
    });
    return await modal.present();
  }

}
