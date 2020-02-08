import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Gallery } from '../addgallery/Gallery';
import { SeoService } from 'src/app/services/seo.service';
import { PageCounterService } from 'src/app/services/pagecounter.service';
import { PageVisitorTrack } from 'src/app/modals/PageVisitorTrack';
import * as Data from '../../../assets/Data.json';


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
  visitor: PageVisitorTrack;

  constructor(private router: Router, private arouter: ActivatedRoute, private imageDBService: GalleryService,
              private sharing: SeoService , private pageViewService: PageCounterService) {
    this.galleryId = this.arouter.snapshot.queryParamMap.get('id');
    this.pageViewService.get(this.galleryId).subscribe(res => {
      this.visitor = res;
      this.visitor.visitcount++;
      console.log("Loading Json Data "+Data);
    });

    
  }
  ngOnInit() {
    if (this.galleryId) {
      this.loadGallery();
      //this.ionViewDidLoad();
      console.log("Loading Json Data "+Data);
    }
  }

  async loadGallery() {
    this.imageDBService.getGallery(this.galleryId).subscribe(res => {
      this.gallery = res;
      this.shareLink(this.gallery);
      this.ionViewDidLoad();
    });
  }

  shareLink(gallery: Gallery) {
    this.sharing.addTwitterCard(gallery.name, gallery.description, gallery.images[0].filepath);
  }

  ionViewDidLoad() {
    console.log("Here is solution");
    this.pageViewService.update(this.visitor);
  }
}
