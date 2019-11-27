import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { MyData } from './MyData';
@Component({
  selector: 'app-addgallery',
  templateUrl: './addgallery.page.html',
  styleUrls: ['./addgallery.page.scss'],
})
export class AddgalleryPage implements OnInit {

  constructor(private storage: AngularFireStorage, private database: AngularFirestore) {
    this.imageCollection = database.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
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
  private imageCollection: AngularFirestoreCollection<MyData>;
  isUploading: boolean;
  isUploaded: boolean;
  fileName: string;
  fileSize: number;

  imagePath: any;
  imgURL: any;
  public message: string;
  fileData: File = null;

  addImages(event: FileList) {
    // The File object
    const file = event.item(0);
    //this.preview(file);
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // this.isUploading = true;
    // this.isUploaded = false;


    // this.fileName = file.name;

    // // The storage path
    // const path = `article1/${new Date().getTime()}_${file.name}`;

    // // Totally optional metadata
    // const customMetadata = { app: 'Freaky Image Upload Demo' };

    // // File reference
    // const fileRef = this.storage.ref(path);

    // // The main task
    // this.task = this.storage.upload(path, file, { customMetadata });

    // // Get file progress percentage
    // this.percentage = this.task.percentageChanges();
    // this.snapshot = this.task.snapshotChanges().pipe(
    //   finalize(() => {
    //     // Get uploaded file storage path
    //     this.UploadedFileURL = fileRef.getDownloadURL();

    //     this.UploadedFileURL.subscribe(resp => {
    //       this.addImagetoDB({
    //         name: file.name,
    //         filepath: resp,
    //         size: this.fileSize
    //       });
    //       this.isUploading = false;
    //       this.isUploaded = true;
    //     }, error => {
    //       console.error(error);
    //     })
    //   }),
    //   tap(snap => {
    //     this.fileSize = snap.totalBytes;
    //   })
    // )
  }


  addImagetoDB(image: MyData) {
    // Create an ID for document
    const id = this.database.createId();

    // Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error ' + error);
    });
  }
  onSelectFile(fileInput: FileList) {
    console.log(fileInput.length);
    console.log(fileInput.item(0));
    this.fileData = fileInput.item(0) as File;
    this.preview();
}

preview() {
  // Show preview 
  const mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  const reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  // tslint:disable-next-line: variable-name
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}

  ngOnInit() {
  }

  
}
