import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRouting } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ContactComponent } from './components/contact/contact.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceComponent } from './components/service/service.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { VeicleComponent } from './components/veicle/veicle.component';
import { CreateserviceComponent } from './components/service/createservice/createservice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EdituserComponent } from './components/usuarios/edituser/edituser.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent,
    ContactComponent,
    InicioComponent,
    LoginComponent,
    ServiceComponent,
    UsuariosComponent,
    VeicleComponent,
    CreateserviceComponent,
    EdituserComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
