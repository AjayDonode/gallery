import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  constructor() {

    /* Saving user data as an object in localstorage if logged out than set to null */
  //   firebase.auth().authState.subscribe(user => {
  //     if (user) {
  //       this.userData = user; // Setting up user data in userData var
  //       localStorage.setItem('user', JSON.stringify(this.userData));
  //       JSON.parse(localStorage.getItem('user'));
  //     } else {
  //       localStorage.setItem('user', null);
  //       JSON.parse(localStorage.getItem('user'));
  //     }
  //   })
  // }

   }


  

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }


  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  getCurrentUser() {
    const user = firebase.auth().currentUser;
    console.log(user.email);
    if (user != null) {
     return user;
    }
  }
}
