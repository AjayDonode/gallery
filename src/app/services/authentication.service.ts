import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  userData: any = null;
  constructor(private router: Router ) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userData = user; // Setting up user data in userData var
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.authState.next(true);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        this.authState.next(false);
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
    this.userData = null;
    return firebase.auth().signOut();
  }

  getCurrentUser() {
    if (this.userData == null) {
        this.userData = JSON.parse(localStorage.getItem('user'));
        if (this.userData == null) {
          // throw Error('No User found');
          this.router.navigate(['login']);
        }
      }
    return this.userData;
  }

  isLoggedIn(): boolean {
    let isLogged = false;
    this.userData = this.getCurrentUser();
    console.log(this.userData);
    if (this.userData) {
      isLogged = true;
    }
    return isLogged;
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }
}
