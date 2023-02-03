import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../modals/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  private currentUser:User;
  constructor(private database: AngularFirestore, private authService: AuthenticationService) {
    this.userCollection = database.collection<User>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  saveUser(uid: any, value: User) {
    return this.userCollection.doc(uid).set(value);
  }

  updateUser(value: User) {
    return this.userCollection.doc(this.authService.getCurrentUserId()).update(value);
  }

  logOut() {
    this.authService.logoutUser();
  }

  getUser(): any {
    return this.userCollection.doc<User>(this.authService.getCurrentUserId()).valueChanges();
  }

  getUserWithID(currentUserId): any {
    return this.userCollection.doc<User>(currentUserId).valueChanges();
  }

  getCurrentUser() {
    this.authService.getCurrentUser();
  }
}
