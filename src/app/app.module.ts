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
import { OwnerhomeComponent } from './components/owner/ownerhome/ownerhome.component';
import { NotificationComponent } from './components/customer/notification/notification.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { DashboardhomeComponent } from './components/owner/dashboardhome/dashboardhome.component';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';

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
    DashboardhomeComponent
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
      { path: "user/signup", component: SignupComponent},

      //customer route
      { path: "customer/menu", component: MenuComponent},
      { path: "customer/cart", component: CartComponent},
      { path: "customer/notification", component: CartComponent},
      { path: "customer/profile", component: ProfileComponent},

      //owner route
      { path: "owner/dashboard", component: OwnerhomeComponent},

    ])

  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
