import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modals/User';
import { GalleryService } from 'src/app/services/gallery.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  userId: any;
  user: User = {displayName: null, email: null};
  gallerylist: any[] = [];

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: true
  };

  constructor(private userService: UserService,private router: Router,private arouter: ActivatedRoute,
    private galleryService: GalleryService) { }

    ngOnInit() {
    
      this.userId = this.arouter.snapshot.paramMap.get('id');
      if (this.userId) {
        this.getUserData()
        this.loadGallery();
      }
    }

    async getUserData() {
      if(this.userId) {
        this.userService.getUserWithID(this.userId).subscribe(res => {
          this.user = res;
        });
      }
    }

    async loadGallery() {
      if(this.userId) {
        this.galleryService.getUserGalleryListById(this.userId).subscribe(res => {
          this.gallerylist = res;
        });
      }
    }

    doClick(galleryId) {
      this.router.navigate(['/gallery/', galleryId]);
    }

}
