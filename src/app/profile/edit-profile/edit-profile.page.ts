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

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: User;
  userProfileForm: FormGroup;

  isUploading: boolean;
  isUploaded: boolean;
  fileName: string;
  uploadedFileURL: any;
  fileSize: number;
  sequence: number;
  imagePath: any;
  imgURL: any;
  task: AngularFireUploadTask;
  // Progress in percentage
  percentage: Observable<number>;
  // Snapshot of uploading file
  snapshot: Observable<any>;

  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder, private userService: UserService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.setProfileForm();
  }

  setProfileForm() {
    if (this.user.bannerURL === undefined) {
      this.user.bannerURL = '/assets/shapes.svg';
    }
    if (this.user.photoURL === undefined) {
      this.user.photoURL = '/assets/userPhoto.png';
    }
    if (this.user.address === undefined) {
      console.log(this.user.address);
      this.user.address = { street: null, city: null, state: null, country: null, zip: null };
    }
    this.userProfileForm = this.formBuilder.group({
      displayName: new FormControl(this.user.displayName, Validators.compose([Validators.required, Validators.minLength(5)])),
      info: new FormControl(this.user.info),
      photoURL: new FormControl(this.user.photoURL, Validators.compose([Validators.minLength(5)])),
      bannerURL: new FormControl(this.user.bannerURL, Validators.compose([Validators.minLength(5)])),
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


  uploadPhoto(event: FileList) {
    const file = event.item(0);
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    this.uploadProfile(file, 'photoUrl');
  }

  uploadBanner(event: FileList) {
    const file = event.item(0);
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    this.uploadProfile(file, 'bannerUrl');
  }

  uploadProfile(file: File, urlType: string) {
    this.isUploading = true;
    this.isUploaded = false;
    this.fileName = file.name;
    // The storage path
    const path = `${this.user.email}/${file.name}`;
    // Totally optional metadata
    console.log(path);
    const customMetadata = { app: 'User Images' };
    // File reference
    const fileRef = this.storage.ref(path);
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    // Get file progress percentage
    // this.UploadedFileURL = fileRef.getDownloadURL();
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.uploadedFileURL = fileRef.getDownloadURL();
        fileRef.getDownloadURL().subscribe(resp => {
          document.querySelector('img').src = resp;
          if (urlType === 'photoUrl') {
            this.user.photoURL = resp;
          } else {
            this.user.bannerURL = resp;
          }
          this.userService.updateUser(this.user).then(res => {
            console.log('Uploaded Photo ' + res);
          });
          console.log(this.user.photoURL);
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        });
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    );
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  save(value) {
    // console.log(value);
    this.userService.updateUser(value).then(res => {
      this.closeModal();
    });
  }

}
