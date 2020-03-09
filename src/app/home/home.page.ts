import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  user;

  constructor( private authService: AuthenticationService) {}

  ngOnInit(): void {
    //Fetching current logged in User 
    this.user =  this.authService.getCurrentUser();
  }

}
