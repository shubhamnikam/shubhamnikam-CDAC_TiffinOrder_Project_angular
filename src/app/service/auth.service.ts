import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.IsLoggedIn()) {
      console.log("User Has Logged in");
      return true;
    }
    else {
      console.log("User Has not Logged in");
      this.router.navigate(['/login']);
      return false;
    }
  }

  IsLoggedIn() {

    if (window.sessionStorage.getItem("isActive") != null
      &&
      window.sessionStorage.getItem("isActive") == "1") {
      // some logic to check if person has logged in
      return true;
    }
    else {
      return false;
    }
  }

  CheckloginCredentialDataWithDB(loginCredentialData) {
    //Call Some  Service using Post Method
    //to check loginCredentialData with DB 
    if (loginCredentialData.email == "abc" && loginCredentialData.password == "abc@123") {
      window.sessionStorage.setItem("isActive", "1");
      return true;
    }
    else {
      return false;
    }
  }

  Logout() {
    window.sessionStorage.setItem("isActive", "0");
    this.router.navigate(['/login']);
  }

}




