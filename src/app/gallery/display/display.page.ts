import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { PageCounterService } from 'src/app/services/pagecounter.service';
import { PageVisitorTrack } from 'src/app/modals/PageVisitorTrack';
import { LoaderService } from 'src/app/services/loader-service.service';


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

  constructor(private arouter: ActivatedRoute, 
              private imageDBService: GalleryService,
              private sharing: SeoService , 
              private pageViewService: PageCounterService,
              private loader: LoaderService) { }
  ngOnInit() {
    this.loader.loadingPresent('Loading', 1000);
    this.galleryId = this.arouter.snapshot.paramMap.get('id');
    if (this.galleryId) {
      this.loadGallery();
      this.setPageView();
      // this.ionViewDidLoad();
    }
  }

  async loadGallery() {
    this.imageDBService.getGallery(this.galleryId).subscribe(res => {
      this.gallery = res;
      this.loader.loadingDismiss();
      // this.shareLink(this.gallery);
      this.loaded = true;
    });
  }

//   shareLink(gallery: Gallery) {
//     this.sharing.addTwitterCard(gallery.name, gallery.description, gallery.images[0].filepath);
//     //REFer thislink for implementation
//     //https://samvloeberghs.be/posts/better-sharing-on-social-media-platforms-with-angular-universal
//   }

  shareIt(shareOn : string) {
            //  var data = { message : 'hello world' };
            // var modalPage = this.modalController.create('ModalPage',data);
            // modalPage.present();
            console.log("Share On "+shareOn)
           
       }


  setPageView() {
      this.pageViewService.get(this.galleryId).subscribe(res => {
      // this.visitor = res;
      // this.visitor.visitcount++;
    });
  }
}
