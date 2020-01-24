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
  public finalCartPrice=130;
  public dailyMenuListDataLength:number;


  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
    this.loadDefaultMenu();
  }

  loadDefaultMenu() {
    //do default requesting via link    
    let defaultDailyMenuType = "LUNCH";
    let observableResult = this.service
      .loadDefaultMenuToCustomerMenuHome(defaultDailyMenuType);

    let responseObj = null;

    observableResult.subscribe((result) => {
      console.log(result);
      responseObj = result;
      this.dailyMenuListData = responseObj.menuList;
      console.log(this.dailyMenuListData);
      this.dailyMenuListDataLength = this.dailyMenuListData.length;
      console.log(this.dailyMenuListDataLength);

      this.menuQuantity = [this.dailyMenuListDataLength];
      // this.menuQuantity = new Array(this.dailyMenuListDataLength);
      //this.tempMenuQuantity = new Array(this.dailyMenuListDataLength);

      for (let i = 0; i < this.dailyMenuListDataLength; i++) {
        // this.tempMenuQuantity[i] = 0;
        this.menuQuantity[i] = 0;
      }

    }, (error) => {
      console.log(error);
    })
  }

  decrementQuantity(index) {
    if (this.menuQuantity[index] > 0) {

      // --this.tempMenuQuantity[index];
      --this.menuQuantity[index];
    }
    console.log(this.menuQuantity[index]);
  }

  incrementQuantity(index) {
    if (this.menuQuantity[index] < 10) {
      //++this.tempMenuQuantity[index];
      ++this.menuQuantity[index];
    }
    console.log(this.menuQuantity[index]);
  }

  sendCartDataToServerSide() {

    var getCartIdFromRequest1;

    //==============cartItemsData================
    let cartItemsData = [];

    for (let i = 0; i < this.dailyMenuListDataLength; i++) {

      let tempMenuData = this.dailyMenuListData[i];

      cartItemsData[i] = {
        cartId: getCartIdFromRequest1,
        menuId: tempMenuData.menuId,
        cartItemsMenuName: tempMenuData.menuName,
        cartItemsPrice: tempMenuData.menuPrice,
        cartItemsQuantity: this.menuQuantity[i],
        cartItemsTotalPrice: (parseInt(tempMenuData.menuPrice) * this.menuQuantity[i])
      }

      this.finalCartPrice = this.finalCartPrice + cartItemsData[i].cartItemsTotalPrice;

      //console.log(cartItemsData[i]);
    }


    //==============cartData================
     let cartData = {
      cartPrice: this.finalCartPrice,
      cartDate: new Date().toISOString().slice(0,10), //format==> 2020-12-01
      cartTime: null,
      orderType: 'DINNER',
    }

    console.log(cartData);




    //==============service for sending only cartData :: post request 1=============
    //============== :: post request 2 ====get only cartId back============
    let observable1 = this.service.sendCartDataToServerSide(cartData);
    let tempResultObjectHolder1;
    let tempCartId;


    observable1.subscribe((result) => {
      console.log(result);
      
      tempResultObjectHolder1 = result;
      console.log("=========" + tempResultObjectHolder1);
      
      tempCartId = tempResultObjectHolder1.cartId;

      getCartIdFromRequest1 = tempCartId;

    }, (error) => {
      console.log(error);
    });



    //==============service for sending only cartItemsData =============
    //============== :: post request 2 ====get nav url============

    // let observable2 = this.service.sendCartItemsDataToServerSide(cartItemsData);
    // let tempResultObjectHolder2;
    // let tempNavigationURL;
    // observable2.subscribe((result) => {
    //   tempResultObjectHolder2 = result;
    //   tempNavigationURL = tempResultObjectHolder2.cartId;

    // }, (error) => {
    //   console.log(error);
    // });

    // //navigate
    // this.router.navigate(['.' + tempNavigationURL]);

  }
}




