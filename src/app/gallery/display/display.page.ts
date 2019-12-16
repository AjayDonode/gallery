import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database.service';
import { ImageData } from '../addgallery/ImageData';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Gallery } from '../addgallery/Gallery';
import { SeoService } from 'src/app/services/seo.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

  gallery: any;
  images: any;
  loaded = false;
  galleryId: any;

  constructor(private router: Router, private arouter: ActivatedRoute, private imageDBService: GalleryService,
    private sharing: SeoService) {
    this.galleryId = this.arouter.snapshot.queryParamMap.get('id');
  }
  ngOnInit() {
    if (this.galleryId) {
      this.loadGallery();
    }
  }

  async loadGallery() {
    this.imageDBService.getImagesForGallery(this.galleryId).subscribe(res => {
      console.log(res);
      this.gallery = res;
      this.shareLink(this.gallery);
    });
  }

  shareLink(gallery: Gallery) {
    this.sharing.addTwitterCard(gallery.name, null, gallery.images[0].filepath);
  }

}
