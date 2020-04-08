import { Component } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
user: User = null;
errorMessage = '';

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private menuController: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.user =  this.authService.getCurrentUser();
    });
  }

  profile() {
    this.navCtrl.navigateForward('/profile');
  this.menuController.enable(false);
}

logout() {
  this.authService.logoutUser().then(
    res => {
      this.navCtrl.navigateForward('/login');
      this.menuController.enable(false);
    },
    err => {
       this.errorMessage = err.message;
    }
  );
}



}
