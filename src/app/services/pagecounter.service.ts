import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { PageVisitorTrack } from '../modals/PageVisitorTrack';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageCounterService {
  visitor: PageVisitorTrack;
  visitors: Observable<PageVisitorTrack[]>;
  private visitorCollection: AngularFirestoreCollection<PageVisitorTrack>;
  // private database: AngularFirestore;
  constructor(private database: AngularFirestore) {
    this.visitorCollection = database.collection<PageVisitorTrack>('PageVisitorTrack');
    this.visitors = this.visitorCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    );
  }


  createVisitor(PAGE_ID: string) {
    // Create an ID for document
    const visitor: PageVisitorTrack = {
              pageid: PAGE_ID,
              visitcount: 1
            };
    // Set document id with value in database
    this.visitorCollection.doc(PAGE_ID).set(visitor).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error while storing to DB' + error);
    });
  }


  get(galleryId: string) {
    return this.visitorCollection.doc<PageVisitorTrack>(galleryId).valueChanges();
 }

  update(pageVisitorTrack: PageVisitorTrack) {
    return this.visitorCollection.doc(pageVisitorTrack.pageid).update(pageVisitorTrack);
  }

  async setVisitorCount(pageId: string)  {
    this.get(pageId).subscribe(res => {
      this.visitor = res;
      this.visitor.visitcount++;
      this.update(this.visitor);
    });
    return this.visitor;
  }
}
