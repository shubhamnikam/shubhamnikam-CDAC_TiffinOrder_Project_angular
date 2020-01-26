import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {


  name="";
  description="";
  price="";
  category="";


  constructor(private service: DataService, private router: Router) { }


  ngOnInit() {
  }

  callForAddNewMenu(){
    let menuObj = {
      menuName: this.name,
      menuDescription: this.description,
      menuPrice: this.price
    }

    console.log(menuObj);

    let observableResult = this.service.addNewMenuService(menuObj, this.category);
    observableResult.subscribe((result) => {
      console.log(result);
      this.router.navigate(['./owner/dashboard']);
    }, (error) => {
      console.log(error);
    })

  }

}
