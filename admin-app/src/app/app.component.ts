import { LoginService } from './services/login.service';
import { Component, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  subscription: Subscription;
  hideNavbar = false;

  constructor(_loginService: LoginService) {
    // this.hideNavbar = false;
    this.subscription = _loginService.getMessage().subscribe(_value => {
      console.log('receive value!!!');
      console.log(_value);
      this.hideNavbar = _value.value;
    });
  }

  fnShowHideHeader(value: boolean) {
    console.log('received: ' + value);
    this.hideNavbar = value;
  }

}
