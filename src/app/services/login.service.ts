import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private subject = new Subject<any>();

  SendStatus(logIn: Boolean) {
    this.subject.next(logIn);
  }

  GetStatus(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }

}
