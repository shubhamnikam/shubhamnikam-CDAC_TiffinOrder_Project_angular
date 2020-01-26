import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public quantity = 0;
  public dailyMenuListData;
  public menuQuantity: any;
  public finalCartPrice = 0;
  public tempFinalCartPrice = 0;
  public dailyMenuListDataLength: number;
  public cartItemsData = [];
  public itemsPriceArray = [];
  public getCartIdFromRequest1: number;
  public orderType = "LUNCH";
  tempUser: any;


  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
    this.setOrderDefaultType();
    //this.loadDefaultMenu();
    
  }


  setOrderDefaultType(){
        this.orderType = "LUNCH";
        this.loadDefaultMenu();
  } 
  setOrderTypeLunch(){
    console.log("LUNCH");
    this.orderType = "LUNCH";
    this.loadDefaultMenu();
  }
  setOrderTypeDinner() {
    console.log("DINNER");
    this.orderType = "DINNER";
    this.loadDefaultMenu();
  }
  setOrderTypeSnack(){
    console.log("SNACK");
    this.orderType = "SNACK";
    this.loadDefaultMenu();
  }





  loadDefaultMenu() {
    //do default requesting via link    
    //let defaultDailyMenuType = "LUNCH";
    let observableResult = this.service
      .loadDefaultMenuToCustomerMenuHome(this.orderType);

    let responseObj = null;

    observableResult.subscribe((result) => {
      console.log(result);
      responseObj = result;
      this.dailyMenuListData = responseObj.menuList;
      console.log(this.dailyMenuListData);
      this.dailyMenuListDataLength = this.dailyMenuListData.length;
      console.log(this.dailyMenuListDataLength);

      this.menuQuantity = [this.dailyMenuListDataLength];
      for (let i = 0; i < this.dailyMenuListDataLength; i++) {
        this.menuQuantity[i] = 0;
      }

    }, (error) => {
      console.log(error);
    })
  }








  decrementQuantity(index) {
    if (this.menuQuantity[index] > 0) {
      --this.menuQuantity[index];
    }
    console.log(this.menuQuantity[index]);
  }

  incrementQuantity(index) {
    if (this.menuQuantity[index] < 10) {
      ++this.menuQuantity[index];
    }
    console.log(this.menuQuantity[index]);
  }










  sendCartDataToServerSide() {

    //===========calculate finalPrice=============
    for (let i = 0; i < this.dailyMenuListDataLength; i++) {

      let tempMenuData = this.dailyMenuListData[i];

      this.itemsPriceArray[i] = {
        cartItemsPrice: tempMenuData.menuPrice,
        cartItemsQuantity: this.menuQuantity[i],
        cartItemsTotalPrice: (parseInt(tempMenuData.menuPrice) * this.menuQuantity[i])
      }
      this.finalCartPrice = this.finalCartPrice + this.itemsPriceArray[i].cartItemsTotalPrice;
      // console.log(this.cartItemsData[i]);
    }

    //==============cartData================
    let cartData = {
      cartPrice: this.finalCartPrice,
      cartDate: new Date().toISOString().slice(0, 10), //format==> 2020-12-01
      cartTime: null,
      orderType: this.orderType,
    }

    console.log(cartData);


    //==============service for sending only cartData :: post request 1=============
    //============== :: post request 1 ====get only cartId back============

    this.tempUser = window.sessionStorage.getItem('userData');

    let observable1 = this.service.sendCartDataToServerSide(cartData, JSON.parse(this.tempUser).userId);
    let tempResultObjectHolder1;
    let tempCartId;


    observable1.subscribe((result) => {
      console.log(result);

      tempResultObjectHolder1 = result;

      tempCartId = tempResultObjectHolder1.cartId;

      this.getCartIdFromRequest1 = tempCartId;
      console.log(this.getCartIdFromRequest1);


      this.sendCartItemsToServerSide();

    }, (error) => {
      console.log(error);
    });
  }










  sendCartItemsToServerSide() {

    //==============cartItemsData================
    for (let i = 0; i < this.dailyMenuListDataLength; i++) {

      let tempMenuData = this.dailyMenuListData[i];
      this.cartItemsData[i] = {
        menuId: tempMenuData.menuId,
        cartItemsMenuName: tempMenuData.menuName,
        cartItemsPrice: tempMenuData.menuPrice,
        cartItemsQuantity: this.menuQuantity[i],
        cartItemsTotalPrice: (this.menuQuantity[i]) * tempMenuData.menuPrice,
      }

      // if (this.menuQuantity[i] > 0) {
      //   this.cartItemsData[i] = {
      //     menuId: tempMenuData.menuId,
      //     cartItemsMenuName: tempMenuData.menuName,
      //     cartItemsPrice: tempMenuData.menuPrice,
      //     cartItemsQuantity: this.menuQuantity[i],
      //     cartItemsTotalPrice: (this.menuQuantity[i]) * tempMenuData.menuPrice,
      //   }
      // }
    }

    let finalCartData = this.cartItemsData;

    window.sessionStorage.setItem('finalCartPrice', JSON.stringify(this.finalCartPrice));
    this.finalCartPrice = 0;

    console.log("finalCartData===============>");
    console.log(finalCartData);

    window.sessionStorage.setItem('cartId', JSON.stringify(this.getCartIdFromRequest1));
    window.sessionStorage.setItem('finalCartData', JSON.stringify(this.cartItemsData));



    //==============service for sending only cartItemsData =============
    //============== :: post request 2 ====get nav url============

    let observable2 = this.service.sendCartItemsDataToServerSide(finalCartData, this.getCartIdFromRequest1);
    let tempResultObjectHolder2;
    let tempNavigationURL;
    observable2.subscribe((result) => {
      tempResultObjectHolder2 = result;
      tempNavigationURL = tempResultObjectHolder2.cartURL;

      console.log(result);
      console.log(tempNavigationURL);

    }, (error) => {
      console.log(error);
    });




    //setup functionality to not go back
    window.sessionStorage.setItem('isOrderStatus',"1");
    this.router.navigate(['./customer/cart']);

  }
}




