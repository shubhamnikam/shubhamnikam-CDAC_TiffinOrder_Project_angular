import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


  allUsersList;
  tempUserList;
  tempUserList2;

  constructor(private service: DataService) { }

  ngOnInit() {

    this.loadOrderList();

  }


  loadOrderList() {

    //call to service 
    let observableResult = this.service.getAllUsers();

    observableResult.subscribe((result) => {
      
      this.tempUserList = result;
      this.allUsersList =  this.tempUserList.userList;

    }, (error) => {
      //in error
      console.log("error :: " + error);

    })


  }

}