import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database.service';
import { ImageData } from '../addgallery/ImageData';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Gallery } from '../addgallery/Gallery';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Observable } from 'rxjs';


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

  constructor(private router: Router, private arouter: ActivatedRoute, private imageDBService: GalleryService) {
    this.galleryId = this.arouter.snapshot.queryParamMap.get('id');
  }
  ngOnInit() {
    if (this.galleryId) {
      this.gallery = this.loadGallery();
    }
  }

  async loadGallery() {
    this.imageDBService.getImagesForGallery(this.galleryId).subscribe(res => {
      console.log(res);
      this.gallery = res;
      return this.gallery;
    });
  }
}
