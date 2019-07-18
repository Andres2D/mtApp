import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {configuration} from '../../configurations/applicationConfiguration.json';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-veicle',
  templateUrl: './veicle.component.html',
  styleUrls: ['./veicle.component.css']
})
export class VeicleComponent implements OnInit {

  isLoading = true;
  veicles: any;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.SendStatus(true);
    this.http.get(configuration.urlBackend + 'api/Vehicles/GetVehiculos')
    .subscribe((data: any) => {
      this.veicles = data;
      this.isLoading = false;
    });
  }
}
