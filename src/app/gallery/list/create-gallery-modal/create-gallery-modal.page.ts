import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GalleryService } from 'src/app/services/gallery.service';
import { Gallery } from '../../addgallery/Gallery';
import { Router, NavigationExtras } from '@angular/router';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ImageData } from '../../addgallery/ImageData';
@Component({
  selector: 'create-gallery-modal-page',
  templateUrl: './create-gallery-modal.page.html',
  styleUrls: ['./create-gallery-modal.page.scss'],
})
export class CreateGalleryModalPage implements OnInit {

  gallery: Gallery;


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
  // Upload Task 
  task: AngularFireUploadTask;
  // Progress in percentage
  percentage: Observable<number>;
  // Snapshot of uploading file
  snapshot: Observable<any>;
  

  constructor(public modalController: ModalController, private galleryService: GalleryService, private router: Router,private storage: AngularFireStorage) {

    this.gallery = {
      id: null,
      name: '',
      description: '',
      images: [],
      tags: [],
      filepath:null,
      createdby: null,
      upadtedby: null
    };
  }

  ngOnInit() {}

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
          this.gallery.filepath = resp;
          //this.gallery.images.push(this.currentImage);
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
    if (this.gallery.id == null) {
      this.gallery = this.galleryService.addGallery(this.gallery);
    } else { this.galleryService.update(this.gallery); }
    this.closeModal();
    const navigationExtras: NavigationExtras = {
      state: {
        gallery: this.gallery
      }
    };
    this.router.navigate(['/addgallery'], navigationExtras);
  }

  close() {
    this.closeModal();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addHtmlContent(){
    
  }
}
