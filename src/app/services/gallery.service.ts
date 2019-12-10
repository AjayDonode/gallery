import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from '../gallery/addgallery/Gallery';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private gallerylist: Observable<Gallery[]>;
  private galleryCollection: AngularFirestoreCollection<Gallery>;

  constructor(private storage: AngularFireStorage, private database: AngularFirestore) {
    this.galleryCollection = database.collection<Gallery>('Gallery');
    this.gallerylist = this.galleryCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        data.id = id;
        return { id, ...data };
      });
    })
    );
  }

  getGalleryList() {
    return this.gallerylist;
  }

  addGallery(gallery: Gallery): Gallery {
    // Create an ID for document
    const id = this.database.createId();
    gallery.id = id;
    // Set document id with value in database
    this.galleryCollection.doc(id).set(gallery).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error while storing to DB' + error);
    });
    return gallery;
  }

  delete(gallery: Gallery) {
    return this.galleryCollection.doc(gallery.id).delete();
  }

  update(gallery: Gallery) {
    return this.galleryCollection.doc(gallery.id).update(gallery);
  }

  getImagesForGallery(galleryId: string) {
     return this.galleryCollection.doc<Gallery>(galleryId).valueChanges();
  }
}
