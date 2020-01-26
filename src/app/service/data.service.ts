import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = "http://localhost:8080/DAC_Tiffin_Project/"

  constructor(private httpHelper:HttpClient) { }

  //=========signIn========
  sendUserSignInDetailsToValidate(signInCredentialDataObj){    
    return this.httpHelper.post(this.baseUrl + "user/signin", signInCredentialDataObj);
  }
  
  //=========signUp========
  sendUserSignUpDetailsToValidate(signUpCredentialDataObj){    
    return this.httpHelper.post(this.baseUrl + "user/signup", signUpCredentialDataObj);
  }
  
  //=========load default menu===========
  loadDefaultMenuToCustomerMenuHome(dailyUserMenuType){   
    return this.httpHelper.get(this.baseUrl + "customer/menu/"+dailyUserMenuType);
  }

  //=========send selected menu to cart===========
  sendCartDataToServerSide(cartData,userId){
    console.log(cartData);
    return this.httpHelper.post(this.baseUrl + "customer/cart/" + userId, cartData);
  } 

  //=========send selected menu to cartItems===========
  sendCartItemsDataToServerSide(cartItemsData, getCartIdFromRequest1){
    return this.httpHelper.post(
      this.baseUrl + "customer/cartitems/" + getCartIdFromRequest1, cartItemsData);
  }  


  //=============add new owner=============================
  addNewOwnerService(signUpCredentialDataObj) {
    return this.httpHelper.post(this.baseUrl + "owner/addnewowner", signUpCredentialDataObj);
  }
  
  //=============add new menu=============================
  addNewMenuService(menuObj, categoryId) {
    return this.httpHelper.post(this.baseUrl + "owner/addnewmenu/"+categoryId, menuObj);
  }
}
