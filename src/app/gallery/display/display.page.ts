import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { PageCounterService } from 'src/app/services/pagecounter.service';
import { PageVisitorTrack } from 'src/app/modals/PageVisitorTrack';
import { LoaderService } from 'src/app/services/loader-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Gallery } from '../addgallery/Gallery';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Like } from 'src/app/modals/Like';
import { ModalController } from '@ionic/angular';
import { ModalCommentComponent } from './add-comment-modal/modal-comment.component';

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
  likeCount = 0;

  constructor(private arouter: ActivatedRoute, 
              private imageDBService: GalleryService,
              private sharing: SeoService ,
              private socialSharing: SocialSharing, 
              private pageViewService: PageCounterService,
              private feedBackService: FeedbackService,
              private loader: LoaderService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loader.loadingPresent('Loading', 1000);
    this.galleryId = this.arouter.snapshot.paramMap.get('id');
    if (this.galleryId) {
      this.loadGallery();
      this.setPageView();
      // this.ionViewDidLoad();
      this.getLikeCount();
    }
   
  }

  async loadGallery() {
    this.imageDBService.getGallery(this.galleryId).subscribe(res => {
      this.gallery = res;
      this.loader.loadingDismiss();
      this.shareLink(this.gallery);
      this.loaded = true;
    });
  }

   shareLink(gallery: Gallery) {
    this.sharing.addTwitterCard(gallery.name, gallery.description, gallery.images[0].filepath);
   }

  shareIt(shareOn : string, gallery: Gallery) {
            
            if(shareOn == "twitter")
              {
              window.open("https://twitter.com/intent/tweet?text="+gallery.name +"&url="+window.location, '_blank', 'location=no')
              }
            else if(shareOn == "whatsapp"){
                window.open("https://api.whatsapp.com/send?text="+gallery.name +"-"+window.location, '_blank', 'location=no')
              } 
            else if(shareOn == "facebook"){
                window.open("https://www.facebook.com/sharer/sharer.php?u="+window.location, '_blank', 'location=no')
              }
            //this.socialSharing.shareViaWhatsApp(this.gallery.name, "", this.gallery.id)
       }


  likeIt(gallery: Gallery) {
    const like: Like = {
      articleId: this.gallery.id,
      userId: "currentUser",
      createdAt: new Date()
    };
    this.feedBackService.addLike(like).then(() => {
      console.log('Like added successfully!');
    }).catch((error) => {
      console.log('Error adding like:', error);
    });
  }

  getLikeCount() {
    this.feedBackService.getLikeCount(this.galleryId).subscribe(count => {
        this.likeCount = count;
    });
  }

  setPageView() {
      this.pageViewService.get(this.galleryId).subscribe(res => {
      // this.visitor = res;
      // this.visitor.visitcount++;
    });
  }


  async openModal(gallery: Gallery) {
    const modal = await this.modalCtrl.create({
      component: ModalCommentComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.message = `Hello, ${data}!`;
    }
  }

}
