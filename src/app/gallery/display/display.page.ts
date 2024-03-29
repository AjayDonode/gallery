import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { UserService } from 'src/app/services/user.service';
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
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/modals/User';


@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

  gallery: Gallery;
  images: any;
  loaded = false;
  galleryId: any;
  visitor: PageVisitorTrack;
  likeCount = 0;
  commentCount = 0;
  currentUserId : any;
  galleryAuthor :User;
  currentScrollPosition = 0;
  recoList: any[] = [];
  showImage= true;


  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    }
  };
  
  constructor(private arouter: ActivatedRoute, 
              private userService: UserService,
              private sharing: SeoService ,
              private socialSharing: SocialSharing, 
              private router: Router,
              private authService: AuthenticationService,
              private pageViewService: PageCounterService,
              private feedBackService: FeedbackService,
              private galleryService: GalleryService,
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
      this.getCommentCount();
      this.hideImage();

    }

    this.currentUserId = this.authService.getCurrentUserId();
    

  }

  hideImage() {
   setTimeout(()=> {this.showImage = false}, 5000);
  }
  

  async loadGallery() {
    this.galleryService.getGallery(this.galleryId).subscribe(res => {
      this.gallery = res;
      this.loader.loadingDismiss();
      this.shareLink(this.gallery);
      this.loaded = true;
      
      if(this.currentUserId==undefined) {
         this.userService.getUserWithID(this.gallery.createdby).subscribe(res => {
          this.galleryAuthor = res;
        }

    )};
    this.loadRecomandations();
    });
  }

  loadRecomandations() {
    if(this.currentUserId !== null) {
      this.galleryService.getUserGalleryList().subscribe(res => {
        this.recoList = res;
      });
    } else {
      this.galleryService.getUserGalleryListById(this.gallery.createdby).subscribe(res => {
        this.recoList = res;
      });
    }
  }

   shareLink(gallery: Gallery) {
    this.sharing.addTwitterCard(gallery.name, gallery.description, gallery.filepath);
   }

  shareIt(shareOn : string, gallery: Gallery) {
   const sharedData =  this.sharing.getShareData(gallery.name, gallery.description, gallery.filepath);
            if(shareOn == "twitter")
              {
                // if(navigator.share)
                // { window.navigator.share(sharedData); } 
                // else
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
      userId: this.currentUserId,
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

  getCommentCount() {
    this.feedBackService.getCommentCount(this.galleryId).subscribe(count => {
        this.commentCount = count;
    });
  }

  setPageView() {
      this.pageViewService.get(this.galleryId).subscribe(res => {
    });
  }


  async openModal(gallery: Gallery) {
    const modal = await this.modalCtrl.create({
      component: ModalCommentComponent,
      componentProps: {
        galleryid: this.galleryId,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    
    }
  }


  onScroll(event) {
    console.log("Event e ",  event )
    this.currentScrollPosition = event.detail.currentY;
  }

  doClick(event) {
    this.router.navigate(['/gallery/', event]);
  }

  goUserPage(gallery: Gallery){
    this.router.navigate(['/user/home']);
  }


}


