import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../modals/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  constructor(private database: AngularFirestore) {
    this.userCollection = database.collection<User>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  saveUser(uid: any, value: any) {
    this.userCollection.doc(uid).set(value);
  }
}
