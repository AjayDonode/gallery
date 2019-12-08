import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { ImageData } from './ImageData';
import { ImageService } from 'src/app/services/image.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { AddModalPage } from './modal/AddModalPage';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery } from './Gallery';
import { GalleryService } from 'src/app/services/gallery.service';

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
        console.log("Printing Gallery Object" + this.gallery.id);
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

  // Uploaded Image List
  images: Observable<ImageData[]>;
  // private imageCollection: AngularFirestoreCollection<MyData>;
  isUploading: boolean;
  isUploaded: boolean;
  fileName: string;
  fileSize: number;

  imagePath: any;
  imgURL: any;
  public message: string;
  fileData: File = null;

  ////
  imageResponse: any;
  options: any;

  addImages(event: FileList) {
    // The File object
    const file = event.item(0);
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
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

    
    this.UploadedFileURL = fileRef.getDownloadURL();
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        this.UploadedFileURL.subscribe(resp => {
          document.querySelector('img').src = resp;
          
          this.gallery.images = [];
          let image : ImageData = {
            name: file.name,
            sequence: 0,
            filepath: resp,
            description: "this.fileSizeTest"
          };
        
          this.gallery.images.push(image);
          this.imageService.update(this.gallery);
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

  ngOnInit() {
  }

  homepage() {
    //Blank function
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddModalPage
    });
    return await modal.present();
  }
}