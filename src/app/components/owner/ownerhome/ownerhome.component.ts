import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { RoutesRecognized, Router } from '@angular/router';

@Component({
  selector: 'app-ownerhome',
  templateUrl: './ownerhome.component.html',
  styleUrls: ['./ownerhome.component.css']
})
export class OwnerhomeComponent implements OnInit {

  todaysDate: Date = new Date();

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
