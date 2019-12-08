import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GalleryService } from 'src/app/services/gallery.service';
import { Gallery } from '../../addgallery/Gallery';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'create-gallery-modal-page',
  templateUrl: './create-gallery-modal.page.html',
  styleUrls: ['./create-gallery-modal.page.scss'],
})
export class CreateGalleryModalPage implements OnInit {

  gallery: Gallery;
  constructor(public modalController: ModalController, private galleryService: GalleryService, private router: Router) {

    this.gallery = {
      id: null,
      name: '',
      description: '',
      images: [],
      createdby: null,
      upadtedby: null
    };
  }

  ngOnInit() {
  }

  saveGallery() {
    if (this.gallery.id == null) {
      this.gallery = this.galleryService.addGallery(this.gallery);
    } else { this.galleryService.update(this.gallery); }
    this.closeModal();
    const navigationExtras: NavigationExtras = {
      state: {
        gallery: this.gallery
      }
    };
    this.router.navigate(['/addgallery'], navigationExtras);
  }

  close() {
    this.closeModal();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
