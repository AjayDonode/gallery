import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { MyData } from './MyData';
import { ImageService } from 'src/app/services/image.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { AddModalPage } from './modal/AddModalPage';

@Component({
  selector: 'app-addgallery',
  templateUrl: './addgallery.page.html',
  styleUrls: ['./addgallery.page.scss'],
})
export class AddgalleryPage implements OnInit {

  constructor(private storage: AngularFireStorage, private imageDBService: DatabaseService, public modalController: ModalController) {
    // this.imageCollection = database.collection<MyData>('Images');
    // this.images = this.imageCollection.valueChanges();
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
  images: Observable<MyData[]>;
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
    const path = `article1/${file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'Gallery Image Upload' };
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
          this.imageDBService.addImage({
            name: file.name,
            sequence: 0,
            filepath: resp,
            description: "this.fileSizeTest"
          });
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

  homepage(){
    //Blank function
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddModalPage
    });
    return await modal.present();
  }
}