import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {

  private subject = new Subject<any>();
  // Observable<hideNavbar>: boolean;
  hideNavbar: boolean;

  constructor() {
    this.hideNavbar = false;
   }

   sendMessage(_value: boolean) {
     this.subject.next({ value: _value });
   }

   clearMessage() {
     this.subject.next();
   }

   getMessage(): Observable<any> {
    return this.subject.asObservable();
   }

}
