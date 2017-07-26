import { Component, OnInit, Input }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { AuthenticationService }  from './authentication.service';

@Component({
 	selector: 'login-page',
 	templateUrl: './login.component.html',
 	providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
  data: any = {};

  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;

	constructor(
    private router: Router,
    private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
    if (localStorage.getItem('currentUser') != null)
      this.router.navigate(['pendaftaran']);
	}

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }

  login() {
    if(this.authenticationService.login(this.data.no_pegawai, this.data.password)) {
      localStorage.getItem('currentUser');
      window.location.assign('/pendaftaran');
    }
    else {
      this.alerts.pop();
      this.alerts.push({id: 1, type: 'warning', message: 'Login gagal, silakan coba lagi'});
    }
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
