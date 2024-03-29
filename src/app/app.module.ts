import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CreateGalleryPageModule } from './gallery/list/create-gallery-modal/create-gallery-modal.module';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import * as firebase from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { EditProfilePageModule } from './profile/edit-profile/edit-profile.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalCommentComponentModule } from './gallery/display/add-comment-modal/modal-comment.module';
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CreateGalleryPageModule,
    ModalCommentComponentModule,
    EditProfilePageModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Granth'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireAuthModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleAnalytics,
    AuthenticationService,
    ReactiveFormsModule,
    Storage,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }