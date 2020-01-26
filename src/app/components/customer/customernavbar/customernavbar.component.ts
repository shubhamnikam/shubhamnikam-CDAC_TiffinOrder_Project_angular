import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-customernavbar',
  templateUrl: './customernavbar.component.html',
  styleUrls: ['./customernavbar.component.css']
})
export class CustomernavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signOut() {

    console.log("In Customer SignOut");

    this.authService.signOut();
    this.router.navigate(['./user/signin']);
  }

}
