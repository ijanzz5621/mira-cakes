import { LoginService } from './../services/login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// model
import { Login } from '../models/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // @Output() fnHideNavbar: EventEmitter<boolean> = new EventEmitter<boolean>();
  hideNavbar = true;
  model = new Login('', '');
  myForm: FormGroup;

  // private loginService: LoginService
  constructor(_loginService: LoginService, private _router: Router) {
    _loginService.sendMessage(this.hideNavbar);
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl('Admin')
      , password: new FormControl()
    });
  }

  submitForm() {
    console.log('Admin password is: ' + this.myForm.controls.password.value);
    if (this.myForm.controls.password.value === 'admin123') {
      this._router.navigateByUrl('');
    }
  }

}
