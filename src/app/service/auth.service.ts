import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['./user/signin']);
      return false;
    }

  }

  isLoggedIn() {
    if (window.sessionStorage.getItem('active') != null
      &&
      window.sessionStorage.getItem('active') == '1') {
      return true;
    } else {
      return false;
    }

  }

  checkUser(currentUserDetails, userType) {
    var userData = JSON.stringify(currentUserDetails);
    window.sessionStorage.setItem('active', '1');
    window.sessionStorage.setItem('userData', userData);
    //window.sessionStorage.setItem('userId', userData);
    window.sessionStorage.setItem('userType', userType);
  }

  signOut() {

    console.log("In Auth SignOut");
    //window.sessionStorage.setItem('active', '0');
    window.sessionStorage.removeItem('active');
    window.sessionStorage.removeItem('userData');
    //window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('userType');

    window.sessionStorage.removeItem('finalCartPrice');
    window.sessionStorage.removeItem('cartId');
    window.sessionStorage.removeItem('finalCartData');
    window.sessionStorage.removeItem('isOrderStatus');
  }

}