import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  constructor() { }

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
}
