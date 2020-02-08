import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageData } from '../gallery/addgallery/ImageData';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  images: Observable<ImageData[]>;
  private imageCollection: AngularFirestoreCollection<ImageData>;

  constructor(private storage: AngularFireStorage, private database: AngularFirestore) {
    this.imageCollection = database.collection<ImageData>('Images');
    this.images = this.imageCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    );

  }

  getImages() {
    return this.images;
  }

  addImage(image: ImageData) {
    // Create an ID for document
    const id = this.database.createId();
    // Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error while storing to DB' + error);
    });
  }

}
