import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageService } from './services/image.service';
import { PreloderService } from './services/preloder.service';
import { DatabaseService } from './services/database.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { FileSizeFormatPipe } from './components/file-size-format.pipe';
@NgModule({
  declarations: [AppComponent,FileSizeFormatPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
           AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
  AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }