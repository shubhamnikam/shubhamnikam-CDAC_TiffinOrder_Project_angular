import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-showorder',
  templateUrl: './showorder.component.html',
  styleUrls: ['./showorder.component.css']
})
export class ShoworderComponent implements OnInit {

  allOrdersList;
  tempOrdersList;

  allOrdersLunchList;
  tempAllOrdersLunchList;

  allOrdersDinnerList;
  tempAllOrdersDinnerList;

  userId;



  constructor(private service: DataService) { }

  ngOnInit() {
    this.getUserName();
    this.loadOrderList(); 

  }

  getUserName() {
    var myUserData = window.sessionStorage.getItem('userData');
    var myParsedTempUserData = JSON.parse(myUserData);
    this.userId = myParsedTempUserData.userId;
  }


  loadOrderList() {

    //call to service 
    let observableResult = this.service.getUsersOrders(this.userId);


    observableResult.subscribe((result) => {
      //in success

      this.tempOrdersList = result;


      this.allOrdersLunchList = this.tempOrdersList.orderLunchList;
      console.log(this.allOrdersLunchList);

      this.allOrdersDinnerList = this.tempOrdersList.orderDinnerList;
      console.log(this.allOrdersDinnerList);


    }, (error) => {
      //in error
      console.log("error :: " + error);

    })


  }

}
