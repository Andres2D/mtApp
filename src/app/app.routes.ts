import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../app/components/inicio/inicio.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceComponent } from './components/service/service.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { VeicleComponent } from './components/veicle/veicle.component';
import { CreateserviceComponent } from './components/service/createservice/createservice.component';
import { EdituserComponent } from './components/usuarios/edituser/edituser.component';

const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'services', component: ServiceComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsuariosComponent },
    { path: 'veicles', component: VeicleComponent },
    { path: 'createservice', component: CreateserviceComponent },
    { path: 'edituser', component: EdituserComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const appRouting = RouterModule.forRoot(routes);