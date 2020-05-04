import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { this.handleExistingSession(); }

  ngOnInit() {

    

    this.validationsForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  handleExistingSession() {
    console.log(this.authService.isAuthenticated());
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.userService.getUser().subscribe(res => {
        this.router.navigate(['/user/home']);
      });
    }
  }

  login(value) {
    this.authService.loginUser(value).then(
      res => {
        this.errorMessage = '';
        this.router.navigate(['/user/home']);
        // this.router.navigate(['user']);
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}
