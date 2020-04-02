import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  userData: any = null;
  constructor(private router: Router, private userService: UserService) {
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
        .then(res => resolve(res),
          err => reject(err));
    });
  }


  updateProfile(value) {
    console.log(this.userData);
    this.userService.saveUser(this.userData.uid, value);
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
    }
    return this.userData;
  }

  getCurrentUserId() {
    return this.userData.uid;
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
