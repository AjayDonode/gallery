import { Component, OnInit, EmbeddedViewRef } from '@angular/core';
import { NavController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticationService } from "./../../services/authentication.service";
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/modals/User';


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
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
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
      const userProfile = this.getProfile(res.user);
      this.userService.saveUser(res.user.uid, userProfile);
      this.errorMessage = '';
      this.successMessage = 'Your account has been created. Please log in.';
      this.router.navigate(['/profile']);
    },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }
  getProfile(user: any): User {
    const userProf: User = {email: null};
    userProf.email = user.email;
    return userProf;
  }

  gotoLogin() {
    this.navCtrl.navigateBack('');
  }

}
