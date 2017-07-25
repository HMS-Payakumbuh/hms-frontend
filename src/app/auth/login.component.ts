import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { AuthenticationService }  from './authentication.service';

@Component({
 	selector: 'login-page',
 	templateUrl: './login.component.html',
 	providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
  data: any = {};

	constructor(
    private router: Router,
    private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
    if (localStorage.getItem('currentUser') != null)
      this.router.navigate(['pendaftaran']);
	}

  login() {
    if(this.authenticationService.login(this.data.email, this.data.password)) {
      localStorage.getItem('currentUser');
      window.location.assign('/pendaftaran');
    }
    else {
      console.log('login failed');
    }
  }
}
