import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {configuration} from '../../../configurations/applicationConfiguration.json';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  forma: FormGroup;
  changePssw: FormGroup;
  isLoading: boolean;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.SendStatus(true);
    this.isLoading = true;

    this.http.get(configuration.urlBackend + 'api/Users/GetUsuario/' + localStorage.getItem('idUsuario'))
    .subscribe((data: any) => {
      console.log(data);
      this.forma = new FormGroup({
        userName: new FormControl(localStorage.getItem('userName')),
        name: new FormControl(data.nombre),
        p_lastName: new FormControl(data.p_apellido),
        s_lastName: new FormControl(data.s_apellido),
        phone: new FormControl(data.telefono),
        email: new FormControl(data.email)
      });
      this.isLoading = false;
    });

    this.changePssw = new FormGroup({
      currentPssw: new FormControl(''),
      newPssw: new FormControl(''),
      verificationPssw: new FormControl('')
    });
  }

  SaveConfiguration() {
    console.log(this.forma.value);
    const request = {
      userId : Number(localStorage.getItem('idUsuario')),
      nombre : this.forma.value.name,
      p_apellido : this.forma.value.p_lastName,
      s_apellido : this.forma.value.s_lastName,
      telefono : this.forma.value.phone,
      email : this.forma.value.email
    };
    console.log(request);
    this.http.put(configuration.urlBackend + 'api/Users/EditarUsuario', request)
    .subscribe((data: any) => {
      this.router.navigate(['/inicio']);
    });
  }
}
