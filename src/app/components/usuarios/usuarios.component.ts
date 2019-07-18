import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {configuration} from '../../configurations/applicationConfiguration.json';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: any;
  isLoading = true;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.SendStatus(true);
    this.http.get(configuration.urlBackend + 'api/Users/GetUsuarios')
    .subscribe((data: any) => {
      this.users = data;
      this.isLoading = false;
    });
  }

}
