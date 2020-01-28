import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tempUser = "";
  parsedTempUserData = "";
  responseObj1;
  responseObj2;
  responseObj3;

  userId = "";
  userName = "";
  userEmail = "";
  userPhone = "";
  userJoinDate = "";

  homefieldone = "";
  homefieldtwo = "";
  homecity = "";
  homepincode = "";
  homestate = "";

  workfieldone = "";
  workfieldtwo = "";
  workcity = "";
  workpincode = "";
  workstate = "";

  card = "";
  date = "";
  cvv = "";
  upi = "";


  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {

    this.getUserName();
    this.getAddressFromDB();
    this.getPaymentFromDB();

  }

  getUserName() {
    var myUserData = window.sessionStorage.getItem('userData');

    var myParsedTempUserData = JSON.parse(myUserData);

    this.userId = myParsedTempUserData.userId;
    console.log(this.userId);
    
    this.userName = myParsedTempUserData.userName;
    this.userEmail = myParsedTempUserData.userEmail;
    this.userPhone = myParsedTempUserData.userPhone;
    this.userJoinDate = myParsedTempUserData.userJoinId;
  }

  getAddressFromDB() {
    let observableResult = this.service
      .getAddressHomeService(this.userId, 'HOME');

    observableResult.subscribe((result) => {
      console.log(result);
      this.responseObj1 = result;

      this.homefieldone = this.responseObj1.addressFieldOne;
      this.homefieldtwo = this.responseObj1.addressFieldTwo;
      this.homecity = this.responseObj1.addressCity;
      this.homepincode = this.responseObj1.addressPincode;
      this.homestate = this.responseObj1.addressState;

    }, (error) => {
      console.log(error);
    })

    let observableResult2 = this.service
      .getAddressWorkService(this.userId, 'WORK');

    observableResult2.subscribe((result) => {
      console.log(result);
      this.responseObj2 = result;

      this.workfieldone = this.responseObj2.addressFieldOne;
      this.workfieldtwo = this.responseObj2.addressFieldTwo;
      this.workcity = this.responseObj2.addressCity;
      this.workpincode = this.responseObj2.addressPincode;
      this.workstate = this.responseObj2.addressState;

    }, (error) => {
      console.log(error);
    })

  }

  getPaymentFromDB() {
    let observableResult = this.service
      .getPaymentService(this.userId);

    observableResult.subscribe((result) => {
      console.log(result);
      this.responseObj3 = result;

      this.card = this.responseObj3.paymentCardNumber;
      this.date = this.responseObj3.paymentCardExpiryDate;
      this.cvv = this.responseObj3.paymentCardCVV;
      this.upi = this.responseObj3.paymentUPI;

    }, (error) => {
      console.log(error);
    })
  }


}
