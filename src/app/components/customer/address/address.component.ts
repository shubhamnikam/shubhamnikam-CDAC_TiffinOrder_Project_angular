import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {


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

  userId = "";


  constructor(private service: DataService) { }

  ngOnInit() {
    this.setUserId();
  }

  setUserId() {
    this.userId = window.sessionStorage.getItem('signUpUserId');
  }

  callToSaveHomeAddress() {

    let homeAddressData = {
      addressType: 'HOME',
      addressFieldOne: this.homefieldone,
      addressFieldTwo: this.homefieldtwo,
      addressCity: this.homecity,
      addressPincode: this.homepincode,
      addressState: this.homestate
    }

    let observableResult = this.service.postAddressService(homeAddressData, this.userId);
    observableResult.subscribe((result) => {
      //success
    }, (error) => {
      //error
    })

  }

  callToSaveWorkAddress() {

    let workAddressData = {
      addressType: 'WORK',
      addressFieldOne: this.workfieldone,
      addressFieldTwo: this.workfieldtwo,
      addressCity: this.workcity,
      addressPincode: this.workpincode,
      addressState: this.workstate
    }

    let observableResult = this.service.postAddressService(workAddressData, this.userId);
    observableResult.subscribe((result) => {
      //success
    }, (error) => {
      //error
    })

  }

  callToSavePaymentAddress() {
  
    let paymentData = {
      paymentUPI: this.upi,
      paymentCardNumber: this.card,
      paymentCardExpiryDate: this.date,
      paymentCardCVV: this.cvv
    }



    let observableResult = this.service.postPaymentService(paymentData, this.userId);
    observableResult.subscribe((result) => {
      //success
    }, (error) => {
      //error
    })
  }
}
