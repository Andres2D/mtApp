import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {configuration} from '../../configurations/applicationConfiguration.json';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  Object = Object;
  servicesData: any;

  modalBikename: string;
  modalOwnerName: string;
  modalWorkerName: string;
  modalBikeStatus: string;

  isLoading: boolean;
  commentsLoaded: boolean;
  noComments: boolean;

  mecanicosData: any;
  idWorkerSelected: any;
  statusSelected: any;
  idServiceSelected: any;
  commentsData: any;
  serviceData: any;
  setService: FormGroup;
  commentData: FormGroup;
  userRole: string;

  workerDataLoaded = false;

  serviceStatus = ['PENDIENTE', 'EN PROGRESO', 'FINALIZADO'];

  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit() {
    this.isLoading = true;
    this.loginService.SendStatus(true);
    this.GetServices();
    this.setService = new FormGroup({
      id_service: new FormControl(),
      worker: new FormControl(''),
      status: new FormControl('')
    });

    this.commentData = new FormGroup({
      comment: new FormControl(''),
      userComment: new FormControl(localStorage.getItem('userName'))
    });

    this.userRole = localStorage.getItem('userRole');
  }

  GetServices() {
    this.isLoading = true;
    this.http.get(configuration.urlBackend + 'api/Servicio/GetServicios/' + localStorage.getItem('userRole')
    + '/' + localStorage.getItem('idUsuario'))
    .subscribe((data: any) => {
      this.servicesData = data;
      this.isLoading = false;
    });
  }

  OpenModal(data: any) {
    this.idWorkerSelected = data.mecanico.id_usuario;
    this.statusSelected = data.estado;
    this.workerDataLoaded = false;
    this.GetMecanicos(data);
    this.modalBikename = data.vehiculo.placa;
    this.modalOwnerName = data.propietario.nombre + ' ' + data.propietario.p_apellido + ' ' + data.propietario.s_apellido;
    this.setService.controls['worker'].setValue(data.mecanico.id_usuario);
    this.setService.controls['status'].setValue(data.estado);
    this.setService.controls['id_service'].setValue(data.id_servicio);
  }

  GetMecanicos(info: any) {
    this.http.get(configuration.urlBackend + 'api/Users/GetMecanicos')
    .subscribe((data: any) => {
      this.workerDataLoaded = true;
      this.mecanicosData = data;
    });
  }

  SetService() {
    const request = {
      id_servicio: this.setService.value.id_service,
      id_mecanico: this.setService.value.worker,
      id_estado_servicio: this.setService.value.status === 'EN PROGRESO' ? 1 : (this.setService.value.status === 'PENDIENTE' ? 2 : 3)
    };

    this.http.put(configuration.urlBackend + 'api/Servicio/ActualizarServicio', request)
    .subscribe((data) => {
      this.GetServices();
    });
  }

  DeleteService() {
   this.http.get(configuration.urlBackend + 'api/Servicio/EliminarServicio/' + this.idServiceSelected)
   .subscribe((data) => {
     this.GetServices();
   });
  }

  OpenDeleteModal(service: any) {
    this.idServiceSelected = service.id_servicio;
    this.modalBikename = service.vehiculo.placa;
  }

  OpenComments(data: any) {
    this.modalBikename = data.vehiculo.placa;
    this.commentsLoaded = false;
    this.http.get( configuration.urlBackend + 'api/Comentarios/GetComentarios/' + data.id_servicio)
      .subscribe((info: any) => {
        this.serviceData = data;
        this.commentsData = info;
        this.noComments = info.length === 0 ? true : false;
        this.commentsLoaded = true;
      });
  }

  CreateComment() {
    const request = {
      comentario: this.commentData.value.comment,
      nombre_usuario: localStorage.getItem('userName'),
      id_servicio: this.serviceData.id_servicio
    };
    this.http.post(configuration.urlBackend + 'api/Comentarios/CrearComentario', request)
      .subscribe((data) => {
        this.OpenComments(this.serviceData);
        this.commentData.reset();
    });
  }
}
