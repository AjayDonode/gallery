import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from '../gallery/addgallery/Gallery';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private gallerylist: Observable<Gallery[]>;
  private galleryCollection: AngularFirestoreCollection<Gallery>;

  constructor(private database: AngularFirestore , private authenticationService: AuthenticationService) {
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

  getUserGalleryList() {
    const uid = this.authenticationService.getCurrentUserId();
    this.galleryCollection = this.database.collection<Gallery>('Gallery', ref => {
      // Compose a query using multiple .where() methods
      return ref.where('createdby', '==', uid);
    });
    this.gallerylist = this.galleryCollection.valueChanges();
    return this.gallerylist;
  }


  getRecoGalleryList() {
    const uid = this.authenticationService.getCurrentUserId();
    this.galleryCollection = this.database.collection<Gallery>('Gallery', ref => {
      // Compose a query using multiple .where() methods
      return ref.orderBy('createdon');
    });
    // this.gallerylist = this.galleryCollection.valueChanges();
    return this.galleryCollection.valueChanges();
  }

  getUserGalleryListById(currentUserId) {
    const uid = currentUserId;
    this.galleryCollection = this.database.collection<Gallery>('Gallery', ref => {
      // Compose a query using multiple .where() methods
      return ref.where('createdby', '==', uid);
    });
    this.gallerylist = this.galleryCollection.valueChanges();
    return this.gallerylist;
  }


  getSuggestedGalleryList() {
    const uid = this.authenticationService.getCurrentUserId();
    this.galleryCollection = this.database.collection<Gallery>('Gallery', ref => {
      // Compose a query using multiple .where() methods
      return ref.orderBy('createdby' , 'desc');
    });
    this.gallerylist = this.galleryCollection.valueChanges();
    return this.gallerylist;
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
    gallery.createdby = this.authenticationService.getCurrentUserId();
    return this.galleryCollection.doc(gallery.id).update(gallery);
  }

  getGallery(galleryId: string) {
     return this.galleryCollection.doc<Gallery>(galleryId).valueChanges();
  }
}
