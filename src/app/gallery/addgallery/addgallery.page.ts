import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { ImageData } from './ImageData';
import { ModalController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { Gallery } from './Gallery';
import { GalleryService } from 'src/app/services/gallery.service';
import { CreateGalleryModalPage } from '../list/create-gallery-modal/create-gallery-modal.page';

@Component({
  selector: 'app-addgallery',
  templateUrl: './addgallery.page.html',
  styleUrls: ['./addgallery.page.scss'],
})
export class AddgalleryPage implements OnInit {
  gallery: Gallery;
  constructor(private storage: AngularFireStorage, private imageService: GalleryService, public modalController: ModalController,
              private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.gallery = this.router.getCurrentNavigation().extras.state.gallery;
        if (this.gallery.images != null && this.gallery.images.length > 0) {
          this.currentIndex = 0;
          this.currentImage = this.gallery.images[this.currentIndex];

        } else {
          this.generateBlankGallery(this.gallery);
        }
      }
    });
  }
  // Upload Task 
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;
  currentImage: ImageData = {
    name: "",
    sequence: 1,
    description: "",
    filepath: "",
  };
  // Uploaded Image List
  images: Observable<ImageData[]>;
  // private imageCollection: AngularFirestoreCollection<MyData>;
  isUploading: boolean;
  isUploaded: boolean;
  fileName: string;
  fileSize: number;
  sequence: number;
  imagePath: any;
  imgURL: any;
  public message: string;
  fileData: File = null;
  currentIndex: number = 0;

  ////
  imageResponse: any;
  options: any;

  generateBlankGallery(gallery: Gallery) {
    gallery.images = [];
    // gallery.createdby = TODO fetch user
  }

  addImages(image: ImageData, event: FileList) {
    // The File object
    const file = event.item(0);
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;
    this.fileName = file.name;
    // The storage path
    const path = `${this.gallery.id}/${file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'Gallery Images' };
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
        // this.UploadedFileURL = fileRef.getDownloadURL();
        fileRef.getDownloadURL().subscribe(resp => {
          document.querySelector('img').src = resp;
          this.currentImage.filepath = resp;
          this.gallery.images.push(this.currentImage);
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    )
  }

  saveGallery() {
    this.imageService.update(this.gallery).then(res => {
      this.router.navigate(['/user/home']);
    });
  }

  addNext() {
    if (this.currentIndex < this.gallery.images.length - 1) {
      this.currentIndex++;
      this.currentImage = this.gallery.images[this.currentIndex];
    } else {
      this.currentImage = {
        name: "",
        sequence: this.currentIndex,
        description: "",
        filepath: "",
      };
      this.currentIndex++;
    }
    document.querySelector('img').src = this.currentImage.filepath;
  }

  ngOnInit() {
  }

  goBack() {
    if (this.currentIndex >= 1) {
      this.currentIndex--;
      this.currentImage = this.gallery.images[this.currentIndex];
    } else {
        this.openModal(this.gallery);
    }
    document.querySelector('img').src = this.currentImage.filepath;
  }

  async openModal(gallery) {
    const modal = await this.modalController.create({
      component: CreateGalleryModalPage,
      componentProps: {
        gallery
      }
    });


    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }

}