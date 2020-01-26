import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {


  public name = "";
  public email = "";
  public password = "";
  public phone = "";
  public message = "";

  constructor(private service: DataService, private router: Router ) { }

  ngOnInit() {
  }

  callForAddNewOwner() {

    let signUpCredentialData = {
      userName: this.name,
      userEmail: this.email,
      userPassword: this.password,
      userPhone: this.phone
    }

    console.log(signUpCredentialData);

    let observableResult = this.service
      .addNewOwnerService(signUpCredentialData);

    observableResult.subscribe((result) => {
      console.log(result);
      this.router.navigate(['./owner/dashboard']);
    }, (error) => {
      console.log(error);
    })
  }

}

