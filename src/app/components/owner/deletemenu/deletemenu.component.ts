import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-deletemenu',
  templateUrl: './deletemenu.component.html',
  styleUrls: ['./deletemenu.component.css']
})
export class DeletemenuComponent implements OnInit {

  allMenuList;
  tempMenuList;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.loadMenuList();
  }

  //NOTE load menu===========>
  loadMenuList(){
    //call to service 
    let observableResult = this.service.getAllMenu();

    observableResult.subscribe((result) => {

      this.tempMenuList = result;
      this.allMenuList = this.tempMenuList.menuList;

    }, (error) => {
      //in error
      console.log("error :: " + error);

    })
  }

 //NOTE delete call for menu===========>
  callForDeleteMenu(menu){
    //call to service 
    let observableResult = this.service.deleteSelectedMenu(menu.menuId);
    observableResult.subscribe((result) => {  
      
      var index = this.allMenuList.indexOf(menu, 0);
      if (index > -1) {
        this.allMenuList.splice(index, 1);
        this.loadMenuList();
      }
     
      console.log("result :: " + result);
      
    }, (error) => {
      console.log("error :: " + error);
    })
  }

}
