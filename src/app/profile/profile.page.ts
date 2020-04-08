import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { EditProfilePage } from './edit-profile/edit-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  profBannerImage: any;
  // validationsForm: FormGroup;
  user: any = {};
  errorMessage = '';
  successMessage = '';
  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUser();
    this.profBannerImage = '/assets/shapes.svg';
  }

  save(value) {
    this.userService.updateUser(value).then((res) => {
      this.errorMessage = '';
      this.successMessage = 'Your account has been created. Please log in.';
      this.router.navigate(['/profile']);
    },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  async loadUser() {
    this.userService.getUser().subscribe(res => {
      this.user = res;
      // this.setProfileForm();
      // this.loader.loadingDismiss();
      // this.loaded = true;
    });
  }

  async doEdit() {
    const modal = await this.modalController.create({
      component: EditProfilePage,
      componentProps: { user: this.user }
      });
    return await modal.present();
  }
  back() {
    this.doSkip();
  }
  doSkip() {
    this.router.navigate(['/user/home']);
  }
}
