import { Component, OnInit }		from '@angular/core';
import { AuthenticationService }          from './authentication.service';

@Component({
 	selector: 'register-page',
 	templateUrl: './register.component.html',
 	providers: [AuthenticationService]
})

export class RegisterComponent implements OnInit {
  data: any = {};

	constructor(
    private authenticationService: AuthenticationService
	) {}

	ngOnInit() {

	}
}
