import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public name = "";
  public email = "";
  public password = "";
  public phone = "";
  public message = "";

  constructor(private service: DataService, private router: Router, ) { }

  ngOnInit() {
  }

  callForSignUpValidation() {

    let signUpCredentialData = {
      userName: this.name,
      userEmail: this.email,
      userPassword: this.password,
      userPhone: this.phone
    }

    let responseObj = null;
    let navigationURL = null;

    console.log(signUpCredentialData);

    let observableResult = this.service
      .sendUserSignUpDetailsToValidate(signUpCredentialData);

    observableResult.subscribe((result) => {
      console.log(result);
      responseObj = result;
      navigationURL = responseObj.userSigninURL;
      console.log(navigationURL);
      this.router.navigate(['.' + navigationURL]);
    }, (error) => {
      console.log(error);
    })
  }

}
