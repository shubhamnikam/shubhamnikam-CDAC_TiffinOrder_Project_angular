import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './MustWatch.components';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  public name = "";
  public email = "";
  public password = "";
  public phone = "";
  public message = "";

  signUpUserId = "";

  constructor(private formBuilder: FormBuilder,private service: DataService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      name: ['',  [Validators.required]],
      phone: ['', [Validators.required]]
    }, {
        validator: MustMatch('password', 'password')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  callForSignUpValidation() {

    let signUpCredentialData = {
      userName: this.name,
      userEmail: this.email,
      userPassword: this.password,
      userPhone: this.phone
    }

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let responseObj = null;

    console.log(signUpCredentialData);

    let observableResult = this.service
      .sendUserSignUpDetailsToValidate(signUpCredentialData);

    observableResult.subscribe((result) => {
      console.log(result);
      responseObj = result;
      this.signUpUserId = responseObj.signUpUserId;


      window.sessionStorage.setItem("signUpUserId", this.signUpUserId);

      this.router.navigate(['./customer/address']);

    }, (error) => {
      console.log(error);
    })
  }


  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
