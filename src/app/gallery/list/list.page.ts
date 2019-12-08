import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { ModalController, IonItem } from '@ionic/angular';
import { CreateGalleryModalPage } from './create-gallery-modal/create-gallery-modal.page';
import { Gallery } from '../addgallery/Gallery';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  gallerylist: any;
  constructor(public modalController: ModalController, private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryService.getGalleryList().subscribe(res => {
      this.gallerylist = res;
    });
  }

  async createNewGallery() {
    const modal = await this.modalController.create({
      component: CreateGalleryModalPage
    });
    return await modal.present();
  }

  deleteItem(item: Gallery) {
    this.galleryService.delete(item);
  }


  editItem(gallery: Gallery) {
    this.openModal(gallery);
  }

  async openModal(gallery) {
    const modal = await this.modalController.create({
      component: CreateGalleryModalPage,
      componentProps: {
        gallery
      }
    });


    modal.onDidDismiss().then((dataReturned) => {
      // if (dataReturned.data.id == null) {
      //   this.expenseService.saveExpense(dataReturned.data);
      // } else {
      //   this.expenseService.updateExpense(dataReturned.data);
      // }
      // this.calculateTotalExpense();
    });
    return await modal.present();
  }

}
