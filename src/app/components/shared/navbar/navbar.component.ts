import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showNavbarOptions: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {

    this.loginService.GetStatus().subscribe((data) => {
      this.showNavbarOptions = data;
    });
  }

  LogOut() {
    localStorage.clear();
  }
}
