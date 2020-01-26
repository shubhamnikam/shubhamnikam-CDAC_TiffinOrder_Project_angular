import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private personalDetailsText = "Personal Details";
  private addressText = "Address Details";
  private cartDetailsText = "Cart Details";
  private paymentDetailsText = "Payment Details";

  private cartItem = '';
  private cartQuantity = '';
  private cartItemPrice = '';

  private upi = "123456@paytm";


  tempUser: any;
  parsedTempUserData;
  userName = ""; userEmail="";
  userPhone = ""; userJoinDate = ""; 
  userAddressDetails; userAddressType = "";
  cartItemsTotalPrice = "";
  cartItemsList;
  cartId;
  finalCartData;
  finalCartPrice;



  constructor(private service: DataService,
    public route: ActivatedRoute,
    public router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    this.setUserName();

    this.setCartItemsList();

  }

  setUserName() {

    this.tempUser = window.sessionStorage.getItem('userData');

    this.parsedTempUserData = JSON.parse(this.tempUser);

    this.userName = this.parsedTempUserData.userName;
    this.userEmail = this.parsedTempUserData.userEmail;
    this.userPhone = this.parsedTempUserData.userPhone;
    this.userJoinDate = new Date().toLocaleDateString();
    this.userAddressType = "Work";
    //this.userAddressList = this.parsedTempUserData.userAddressList[i];
    this.userAddressDetails = "Sunshine PG, Phase 1, Hinjewadi, Pune - 510102";
  }


  setCartItemsList() {

    // this.cartId = JSON.parse(window.sessionStorage.getItem('cartId'));
     this.finalCartPrice = JSON.parse(window.sessionStorage.getItem('finalCartPrice'));
    this.cartItemsList = JSON.parse(window.sessionStorage.getItem('finalCartData'));
    
    console.log("=======+++====");
    console.log(this.cartItemsList);

    
  }

}
