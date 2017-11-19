import { LoginService } from '../../services/login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// model
import { Login } from '../../model/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      username: new FormControl('')
      , password: new FormControl()
    });
  }

  submitForm() {
    console.log('password is: ' + this.myForm.controls.password.value);
    if (this.myForm.controls.password.value === 'admin123') {
      this._router.navigateByUrl('');
    }
  }

}
