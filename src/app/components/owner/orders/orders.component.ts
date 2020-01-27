import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  allOrdersList;
  tempOrdersList;

  allOrdersLunchList;
  tempAllOrdersLunchList;

  allOrdersDinnerList;
  tempAllOrdersDinnerList;



  constructor(private service: DataService) { }

  ngOnInit() {

    this.loadOrderList();

  }


  loadOrderList(){

    //call to service 
    let observableResult = this.service.getAllOrders();


    observableResult.subscribe((result) => { 
      //in success

      this.tempOrdersList = result;

      
      this.allOrdersLunchList = this.tempOrdersList.orderLunchList;
      console.log(this.allOrdersLunchList);
      
      this.allOrdersDinnerList = this.tempOrdersList.orderDinnerList;
      console.log(this.allOrdersDinnerList);


    }, (error)=>{
      //in error
      console.log("error :: " + error);
      
    })


  }

}
