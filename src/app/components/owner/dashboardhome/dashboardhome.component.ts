import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})
export class DashboardhomeComponent implements OnInit {

  allBIDataList;
  tempBIDataList;

  todaysNumberOfOrders = "";
  todaysNumberOfNewUsers = "";
  todaysNumberOfLunchOrders = "";
  todaysNumberOfDinnerOrders = "";
  todaysTotalSumOfOrders = "";

  constructor(private service: DataService) { }

  ngOnInit() {
    this.getBIData()
  }

  getBIData(){
    let observableResult = this.service.getBIDataService();

    observableResult.subscribe((result) => {

      this.tempBIDataList = result;
      this.allBIDataList = this.tempBIDataList.allValuedBIList;

      this.todaysNumberOfOrders = this.allBIDataList.todaysNumberOfOrders;
      this.todaysNumberOfNewUsers = this.allBIDataList.todaysNumberOfNewUsers;
      this.todaysNumberOfLunchOrders = this.allBIDataList.todaysNumberOfLunchOrders;
      this.todaysNumberOfDinnerOrders = this.allBIDataList.todaysNumberOfDinnerOrders;
      this.todaysTotalSumOfOrders = this.allBIDataList.todaysTotalSumOfOrders;
    
    }, (error) => {
      //in error
      console.log("error :: " + error);

    })
  }
  

}
