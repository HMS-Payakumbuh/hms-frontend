import { Component, OnInit, Input }		from '@angular/core';
import { Router }                     from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { AuthenticationService }      from './authentication.service';
import { User }                       from './user';

@Component({
 	selector: 'login-page',
 	templateUrl: './login.component.html',
 	providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
  data: any = {};

	constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) {}

	ngOnInit() {

	}

  login() {
    this.authenticationService.login(this.data);
  }
}
