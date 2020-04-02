import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  profBannerImage: any;
  validationsForm: FormGroup;
  user: any;
  errorMessage = '';
  successMessage = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.profBannerImage = "/assets/shapes.svg";
    this.validationsForm = this.formBuilder.group({
      displayName: new FormControl(
        this.user.displayName,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      email: new FormControl(
        this.user.email,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.compose([Validators.minLength(5)]))
    });
  }

  save(value) {
    this.authService.updateProfile(value);
    // .then((res) => {
    //   this.errorMessage = '';
    //   this.successMessage = 'Your account has been created. Please log in.';
    //   this.router.navigate(['/profile']);
    // },
    //   err => {
    //     console.log(err);
    //     this.errorMessage = err.message;
    //     this.successMessage = '';
    //   });
  }

  doSkip() {
    this.router.navigate(['/user/home']);
  }
}
