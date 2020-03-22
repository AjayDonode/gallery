import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  user = null;
  constructor( private authService: AuthenticationService, private menuController: MenuController) {}
  ngOnInit(): void {
    //Fetching current logged in User 
    this.user =  this.authService.getCurrentUser();
  }

  openEnd() {
    this.openMenu();
  }

  async openMenu() {
    await this.menuController.open();
  }

}
