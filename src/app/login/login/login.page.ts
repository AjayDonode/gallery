import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticationService } from "./../../services/authentication.service";
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
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  login(value) {
    this.authService.loginUser(value).then(
      res => {
        this.errorMessage = '';
        this.navCtrl.navigateForward('/user/home');
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}
