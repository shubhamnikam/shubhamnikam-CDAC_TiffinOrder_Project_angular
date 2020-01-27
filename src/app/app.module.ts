import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { NgModel, NgForm, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomenavbarComponent } from './components/common/homenavbar/homenavbar.component';
import { LandingComponent } from './components/common/landing/landing.component';
import { SigninComponent } from './components/common/signin/signin.component';
import { SignupComponent } from './components/common/signup/signup.component';
import { MenuComponent } from './components/customer/menu/menu.component';
import { CustomernavbarComponent } from './components/customer/customernavbar/customernavbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { NotificationComponent } from './components/customer/notification/notification.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { DeletemenuComponent } from './components/owner/deletemenu/deletemenu.component';
import { OrdersComponent } from './components/owner/orders/orders.component';
import { CustomersComponent } from './components/owner/customers/customers.component';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';
import { OwnerhomeComponent } from './components/owner/ownerhome/ownerhome.component';
import { DashboardhomeComponent } from './components/owner/dashboardhome/dashboardhome.component';
import { AddadminComponent } from './components/owner/addadmin/addadmin.component';
import { AddmenuComponent } from './components/owner/addmenu/addmenu.component';
import { DailymenuComponent } from './component/owner/dailymenu/dailymenu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomenavbarComponent,
    LandingComponent,
    SigninComponent,
    SignupComponent,
    MenuComponent,
    CustomernavbarComponent,
    FooterComponent,
    CartComponent,
    OwnerhomeComponent,
    NotificationComponent,
    ProfileComponent,
    DashboardhomeComponent,
    AddadminComponent,
    AddmenuComponent,
    DeletemenuComponent,
    OrdersComponent,
    CustomersComponent,
    DailymenuComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([

      // defaulthome route
      { path: "", component: LandingComponent},


      // common route
      { path: "user/signin", component: SigninComponent},
      { path: "user/signup", component: SignupComponent },
      { path: "user/signout", component: LandingComponent},

      //customer route
      { path: "customer/menu", component: MenuComponent, canActivate: [AuthService] },
      { path: "customer/cart", component: CartComponent, canActivate: [AuthService] },
      { path: "customer/notification", component: CartComponent, canActivate: [AuthService] },
      { path: "customer/profile", component: ProfileComponent, canActivate: [AuthService] },

      //owner route
      { path: "owner/signup", component: SignupComponent },
      { path: "owner/dashboard", component: OwnerhomeComponent, canActivate: [AuthService]},
      { path: "owner/addadmin", component: AddadminComponent, canActivate: [AuthService]},
      { path: "owner/addmenu", component: AddmenuComponent, canActivate: [AuthService]},
      { path: "owner/deletemenu", component: DeletemenuComponent, canActivate: [AuthService]},
      { path: "owner/orders", component: OrdersComponent, canActivate: [AuthService]},
      { path: "owner/customers", component: CustomersComponent, canActivate: [AuthService]},


      //wrong url
      { path: "**", component: LandingComponent },
      
    ])

  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
