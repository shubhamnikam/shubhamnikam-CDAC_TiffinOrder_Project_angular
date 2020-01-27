import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tempUser = "";
  parsedTempUserData="";

  userName = "";
  userEmail = "";
  userPhone = "";
  userJoinDate="";


  constructor(private service : DataService) { }

  ngOnInit() {

    this.setUserName();

  }

  //NOTE :: setUserName
    setUserName(){

      this.tempUser = window.sessionStorage.getItem('userData');

      this.parsedTempUserData = JSON.parse(this.tempUser);
      console.log(this.parsedTempUserData);
      
      //this.userName = this.parsedTempUserData.userName; 

      // this.userName = this.parsedTempUserData.userName;
      // this.userEmail = this.parsedTempUserData.userEmail;
      // this.userPhone = this.parsedTempUserData.userPhone;
      // this.userJoinDate = new Date().toLocaleDateString();
    }
}
