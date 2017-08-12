import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { AuthenticationService }  from './authentication.service';

@Component({
 	selector: 'register-page',
 	templateUrl: './register.component.html',
 	providers: [AuthenticationService]
})

export class RegisterComponent implements OnInit {
  data: any = {};

	constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) {}

	ngOnInit() {

	}

  register() {
    this.authenticationService.register(this.data).subscribe(
      data => {
        let toastOptions: ToastOptions = {
            title: "Success",
            msg: "Registrasi user berhasil",
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };

        this.toastyService.success(toastOptions);
      },
      error => {
        let toastOptions: ToastOptions = {
            title: "Error",
            msg: "Registrasi user gagal",
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };

        this.toastyService.error(toastOptions);
      }
    )
  }
}
