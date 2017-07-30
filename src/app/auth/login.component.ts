import { Component, OnInit, Input }		from '@angular/core';
import { Router }                     from '@angular/router';
import { AuthenticationService }      from './authentication.service';
import { User }                       from './user';

@Component({
 	selector: 'login-page',
 	templateUrl: './login.component.html',
 	providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
  data: any = {};

  @Input()
  public alerts: Array<IAlert> = [];

	constructor(
    private router: Router,
    private authenticationService: AuthenticationService
	) {}

	ngOnInit() {

	}

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  login() {
    this.authenticationService.login(this.data.no_pegawai, this.data.password).subscribe(
      () => {
        if (this.authenticationService.isLoggedIn()) {
          window.location.assign('');
        }
        else {
          this.alerts.pop();
          this.alerts.push({id: 1, type: 'warning', message: 'Login gagal, silakan coba lagi'});
        }
      }
    );
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
