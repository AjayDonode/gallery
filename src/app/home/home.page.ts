import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MenuController } from '@ionic/angular';
import { GalleryService } from '../services/gallery.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../modals/User';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  user: User = {displayName: null,
     email: null};
  gallerylist: any[] = [];
  constructor(private userService: UserService,
              private menuController: MenuController,
              private router: Router,
              private galleryService: GalleryService) { }
  ngOnInit(): void {
    // Fetching current logged in User
    this.userService.getUser().subscribe(res=> {this.user  = res; });
    this.galleryService.getUserGalleryList().subscribe(res => {
      this.gallerylist = res;
    });
  }

  openEnd() {
    this.openMenu();
  }

  async openMenu() {
    this.menuController.enable(true);
    await this.menuController.open();
  }

  doClick(event) {
    this.router.navigate(['/gallery/', event]);
  }
}
