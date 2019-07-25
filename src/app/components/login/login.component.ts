import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { configuration } from '../../configurations/applicationConfiguration.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  errorMessage = '';
  isLoading = false;
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.SendStatus(false);
    this.forma = new FormGroup({
      user: new FormControl(''),
      password: new FormControl('')
    });
  }

  LogIn() {
    this.isLoading = true;
    this.errorMessage = '';
    const request = {
      userName: this.forma.value.user,
      password: this.forma.value.password
    };

    this.http.post(configuration.urlBackend + 'api/Login/Login', request)
      .subscribe((data: any) => {
        if (data[0] == null) {
          this.errorMessage = `Usuario ${this.forma.value.user} no existe`;
        } else if (data[0].contrasena ===  this.forma.value.password) {
          localStorage.setItem('userName', data[0].nombre_usuario);
          this.router.navigate(['/inicio']);
          this.http.get(configuration.urlBackend + 'api/Users/GetPermissionData/' + data[0].id_login)
          .subscribe((pemissionCode: any) => {
            localStorage.setItem('userRole', pemissionCode.id_tipo_usuario);
            localStorage.setItem('idUsuario', pemissionCode.id_usuario);
            this.loginService.SendStatus(true);
          });
        } else {
          this.errorMessage = 'Contraseña incorrecta';
        }
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Conexion rechazada';
      });
  }
}
