import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public email = "";
  public password = "";
  public message = "";

  constructor(private service: DataService,
    public route: ActivatedRoute,
    public router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  callForSignInValidation() {

    let signInCredentialData = {
      userEmail: this.email,
      userPassword: this.password
    }

    let responseObj = null;
    let navigationURL = null;
    let currentUserDetails = null;
    let userType = null;

    console.log(signInCredentialData);

    let observableResult = this.service
      .sendUserSignInDetailsToValidate(signInCredentialData);

    observableResult.subscribe((result) => {
      console.log(result);
      
        responseObj = result;

      //get current user details and save it in session storage
      currentUserDetails = responseObj.currentUserDetails;

      //get userType 
      userType = responseObj.userType;

      this.authService.checkUser(currentUserDetails,userType);
      
      //get nav url
      navigationURL = responseObj.userURL;

      if (userType =="CUSTOMER"){
        this.router.navigate(['./customer/menu']);
      } else if (userType == "OWNER"){
        this.router.navigate(['./owner/dashboard']);
      } else{
        alert("Invalid Credential");
      }

    }, (error) => {
      console.log(error);
        this.message = "Invalid credential...";
    })
  }

}