import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public email = "";
  public password = "";
  public message = "";

  constructor(private service: DataService,private router: Router) { }

  ngOnInit() {
  }

  callForSignInValidation() {

    let signInCredentialData = {
      userEmail : this.email,
      userPassword : this.password
    }

    let responseObj = null;
    let navigationURL = null;

    console.log(signInCredentialData);
    
    let observableResult = this.service
      .sendUserSignInDetailsToValidate(signInCredentialData);

    observableResult.subscribe((result)=>{
      console.log(result);
      responseObj = result;
      navigationURL = responseObj.userURL;
      console.log(navigationURL);
      this.router.navigate(['.'+navigationURL]);
    },(error)=>{
      console.log(error);
        this.message = "Invalid login credential...";
    })
  }



}
