import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private subject = new Subject<any>();
  staticStatus: boolean;

  SendStatus(logIn: boolean) {
    this.subject.next(logIn);
  }

  GetStatus(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }

}
