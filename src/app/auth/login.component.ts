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
    if (localStorage.getItem('currentUser') != null)
      this.router.navigate(['pendaftaran']);
	}

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  login() {
    if(this.authenticationService.login(this.data.no_pegawai, this.data.password)) {
      let user: User = JSON.parse(localStorage.getItem('currentUser'));
      switch (user.role) {
        case 'dokter': {
          window.location.assign('/dokter-dashboard');
          break;
        }
        case 'petugasLab': {
          window.location.assign('/petugas-lab-dashboard')
          break;
        }
        default: {
          window.location.assign('/pendaftaran');
          break;
        }
      }
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
