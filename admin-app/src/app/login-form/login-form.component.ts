import { LoginService } from './../services/login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // @Output() fnHideNavbar: EventEmitter<boolean> = new EventEmitter<boolean>();
  hideNavbar = true;

  // private loginService: LoginService
  constructor(_loginService: LoginService) {
    // _loginService.showHideNavbar(true);
    console.log('Emit hide show navbar value');
    // this.fnHideNavbar.emit(this.hideNavbar);
    _loginService.sendMessage(this.hideNavbar);
  }

  ngOnInit() {
  }

}
