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
  
  //===========address and payment=============
  postAddressService(addressData, userId) {
    console.log("=========AddressData==========>");
    console.log(addressData);
    
    return this.httpHelper.post(this.baseUrl + "customer/address/"+userId, addressData);
  }

  postPaymentService(paymentData, userId) {

    console.log("=========PaymentData==========>");
    console.log(paymentData);

    return this.httpHelper.post(this.baseUrl + "customer/payment/"+userId, paymentData);
  }
   //===========get address and payment=============
  getAddressHomeService(userId, addressType) {
    console.log("=========Get Address Data==========>");
    return this.httpHelper.get(this.baseUrl + "customer/profileaddress/" + userId + "/" + addressType);
  }

  getAddressWorkService(userId, addressType) {
    console.log("=========Get Address Data==========>");
    return this.httpHelper.get(this.baseUrl + "customer/profileaddress/" + userId + "/" + addressType);
  }

  getPaymentService(userId) {
    console.log("=========Get PaymentData==========>");
    return this.httpHelper.get(this.baseUrl + "customer/profilepayment/"+userId);
  }

  //====================Update Address========================
  //===========address and payment=============
  updateAddressService(addressData, userId) {
    console.log("=========Update AddressData==========>");
    console.log(addressData);

    return this.httpHelper.put(this.baseUrl + "customer/updateaddress/" + userId, addressData);
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
  
  

//=========================OWNER SIDE=================================================
  //=============add new owner=============================
  addNewOwnerService(signUpCredentialDataObj) {
    return this.httpHelper.post(this.baseUrl + "owner/addnewowner", signUpCredentialDataObj);
  }
  
  //=============add new menu=============================
  addNewMenuService(menuObj, categoryId) {
    return this.httpHelper.post(this.baseUrl + "owner/addnewmenu/"+categoryId, menuObj);
  }

  //=============get All Users List=============================
  getAllUsers(){
    return this.httpHelper.get(this.baseUrl + "owner/getAllUsers");
  } 
  
  //=============get All Orders List=============================
  //==============taken from cart table==================
  getAllOrders(){ 
    return this.httpHelper.get(this.baseUrl + "owner/getOrders");
  }

  getAllMenu() {
    return this.httpHelper.get(this.baseUrl + "owner/getAllMenu");
  }

  deleteSelectedMenu(menuId) {
    return this.httpHelper.delete(this.baseUrl + "owner/deleteMenu/" + menuId);
  }

  getBIDataService(){
    return this.httpHelper.get(this.baseUrl + "owner/getAllBIData");
  }


}
