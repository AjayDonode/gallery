import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticationService } from "./../../services/authentication.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  errorMessage = '';
  successMessage = '';
  validationsForm: FormGroup;

  constructor(private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  register(value) {
    this.authService.registerUser(value).then((res) => {
      this.errorMessage = '';
      this.successMessage = 'Your account has been created. Please log in.';
    },
      err => {
        this.errorMessage = err.message;
        this.successMessage = '';
    });
}

gotoLogin() {
  this.navCtrl.navigateBack('');
}

}
