import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/modals/User';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ɵNgStyleImpl } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: User;
  userProfileForm: FormGroup;
  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.setProfileForm();
  }

  setProfileForm() {
    if (this.user.address === undefined) {
      console.log(this.user.address);
      this.user.address = { street: null, city: null, state: null, country: null, zip: null };
    }
    this.userProfileForm = this.formBuilder.group({
      displayName: new FormControl(this.user.displayName, Validators.compose([Validators.required, Validators.minLength(5)])),
      info: new FormControl(this.user.info),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.compose([Validators.minLength(5)])),
      address: this.formBuilder.group({
        street: new FormControl(this.user.address.street, Validators.compose([Validators.minLength(5)])),
        city: new FormControl(this.user.address.city, Validators.compose([Validators.minLength(5)])),
        state: new FormControl(this.user.address.state, Validators.compose([Validators.minLength(5)])),
        country: new FormControl(this.user.address.country, Validators.compose([Validators.minLength(5)])),
        zip: new FormControl(this.user.address.zip, Validators.compose([Validators.minLength(5)]))
      })
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  save(value) {
    this.userService.updateUser(value).then(res => {
      this.closeModal();
    })
  }

}
