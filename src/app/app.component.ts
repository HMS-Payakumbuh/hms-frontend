import { Component }			from '@angular/core';
import { AuthenticationService }	from './auth/authentication.service';
import { User }						from './auth/user';

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	providers: [AuthenticationService]
})

export class AppComponent {
	title = 'Hospital Management System';
	user: any = JSON.parse(localStorage.getItem('currentUser'));

	constructor(
		private authenticationService: AuthenticationService
	) { }

	logout() {
		this.authenticationService.logout();
		window.location.assign('login');
	}
}
