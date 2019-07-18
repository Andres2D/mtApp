import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {configuration} from '../../../configurations/applicationConfiguration.json';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-createservice',
  templateUrl: './createservice.component.html',
  styleUrls: ['./createservice.component.css']
})
export class CreateserviceComponent implements OnInit {

  service: FormGroup;
  client: FormGroup;
  vehicle: FormGroup;
  clientesLoaded = false;
  dataIsLoaded = false;
  clientesData: any;
  userVehiclesData: any;
  idUserSelected: string;
  mecanicosData: any;


  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.GetClients();
    this.GetMecanicos();
    this.loginService.SendStatus(true);

    this.client = new FormGroup({
      name: new FormControl(''),
      f_lastName: new FormControl(''),
      s_lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      userName: new FormControl('')
    });

    this.service = new FormGroup({
      clientInfo: new FormControl(),
      vehicleInfo: new FormControl(),
      workerInfo: new FormControl()
    });

    this.vehicle = new FormGroup({
      placa: new FormControl(''),
      tipo_vehiculo: new FormControl('')
    });
  }

  GetClients() {
    this.http.get(configuration.urlBackend + 'api/Users/GetClientes')
    .subscribe((data: any) => {
      this.clientesData = data;
      this.clientesLoaded = true;
      this.service.controls['clientInfo'].setValue(data[0].id_usuario);
      this.GetVehicles();
    });
  }

  GetVehicles() {
    this.idUserSelected = this.service.value.clientInfo;
    this.dataIsLoaded = false;
    this.http.get(configuration.urlBackend + 'api/UserVehicles/GetUserVehicle/' + this.idUserSelected)
    .subscribe((data: any) => {
      this.userVehiclesData = data;
      this.dataIsLoaded = true;
    });
  }

  SaveClient() {
    const requests = {
      nombre : this.client.value.name,
      p_apellido : this.client.value.f_lastName,
      s_apellido : this.client.value.s_lastName,
      telefono : this.client.value.phone,
      email : this.client.value.email,
      userName: this.client.value.userName
    };

    this.http.post(configuration.urlBackend + 'api/Users/CrearCliente', requests)
    .subscribe((data: any) => {
      this.GetClients();
    });
  }

  SaveUserVehicle() {
    const requests = {
      placa: this.vehicle.value.placa,
      tipo_vehiculo: this.vehicle.value.tipo_vehiculo
    };

    this.http.post(configuration.urlBackend + 'api/Vehicles/CrearVehiculo', requests)
    .subscribe((data: any) => {
      const request2 = {
        id_usuario_cliente: this.idUserSelected,
        id_vehiculo: data.id_vehiculo
      };
      this.http.post(configuration.urlBackend + 'api/UserVehicles/CrearUsuarioVehiculo', request2)
      .subscribe((info: any) => {
        this.GetClients();
      });
    });
  }

  GetMecanicos() {
    this.http.get(configuration.urlBackend + 'api/Users/GetMecanicos')
    .subscribe((data: any) => {
      this.mecanicosData = data;
    });
  }

  SaveService() {
    // Id Mecanico Fijo
    const idMecanico = this.service.value.workerInfo;

    // Id Vehiculo Fijo
    const idVehiculo = this.service.value.vehicleInfo;

    let userData: any;
    let vehicleData: any;
    // Id relación cleinte-vehiculo
    console.log('us: ', this.userVehiclesData);
    console.log(idVehiculo);

    this.userVehiclesData.forEach(data => {
      if (data.vehiculo.id_vehiculo === Number(idVehiculo)) {
        userData = data.usuario;
        vehicleData = data.vehiculo;
      }
    });

    const requests = {
      usuario: userData,
      vehiculo: vehicleData
    };

    console.log('request: ', requests);

    this.http.post(configuration.urlBackend + 'api/UserVehicles/GetDataUserVehicle', requests)
    .subscribe((data: any) => {
      console.log('response: ', data);
      const requests2 = {
        fecha_ingreso: '2019-06-29',
        id_usuarios_vehiculos: data[0].id_usuarios_vehiculos,
        id_usuario_encargado: idMecanico,
        id_estado: 2
      };
      console.log(requests2);
      this.http.post(configuration.urlBackend + 'api/Servicio/CrearServicio', requests2)
          .subscribe((info: any) => {
          this.router.navigate(['/services']);
      });
    });
  }
}
