import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private personalDetails = "Personal Details";
  private addressDetails = "Address Details";
  private cartDetails = "Cart Details";
  private paymentDetails = "Payment Details";

  private name = "John Doe";
  private address = "Sunshine PG, Phase 1, Hinjewadi, Pune - 510102";
  private phone = "97684 96839";
  private addressType = "Work";

  private cartitem1 = "Chapati";
  private cartqty1 = "3X";
  private cartitemprice1 = "24 Rupees";

  private cartitem2 = "Aloo Sabji";
  private cartqty2 = "1X";
  private cartitemprice2 = "22 Rupees";

  private cartitem3 = "Salad";
  private cartqty3 = "1X";
  private cartitemprice3 = "18 Rupees";

  private upi = "123456@paytm";

  constructor() { }

  ngOnInit() {
  }

}
