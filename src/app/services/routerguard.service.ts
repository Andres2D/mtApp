import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class RouterGuardService implements CanActivate {

    userStatus: boolean;

constructor(private router: Router, private loginService: LoginService) { }

    canActivate() {
        console.log(window.location);
        return false;
    }
}
