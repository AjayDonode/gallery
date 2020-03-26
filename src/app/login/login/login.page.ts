import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticationService } from "./../../services/authentication.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.handleExistingSession();

    this.validationsForm = this.formBuilder.group({
      email: new FormControl(
        'testuser@gmail.com',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        'testuser',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }


  handleExistingSession() {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log("is IN " + isLoggedIn);
    if (isLoggedIn) {
      this.navCtrl.navigateForward('/user/home');
    }
  }

  login(value) {
    this.authService.loginUser(value).then(
      res => {
        this.errorMessage = '';
        this.navCtrl.navigateForward('/user/home');
        // this.router.navigate(['user']);
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}
