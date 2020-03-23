import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  userData: any;
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userData = user; // Setting up user data in userData var
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        console.log(user.uid);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
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
    localStorage.removeItem('user');
    return firebase.auth().signOut();
  }

  getCurrentUser() {
    const user =  JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user != null) {
      return user;
    } else {
      console.log('No User found');
    }
  }
}
