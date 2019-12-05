import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { ModalController } from '@ionic/angular';
import { CreateGalleryModalPage } from './create-gallery-modal.page';


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
   console.log("Create Gallery");
   const modal = await this.modalController.create({
    component: CreateGalleryModalPage
  });
  return await modal.present();
}
 


}
