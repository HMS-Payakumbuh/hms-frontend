import { Component, OnInit, Input }		from '@angular/core';
import { Router }                     from '@angular/router';
import { AuthenticationService }      from './auth/authentication.service';

@Component({
 	selector: 'home-page',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

	constructor(
    private router: Router,
    private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
    switch (this.authenticationService.getCurrentUser().role) {
      case 'dokter': {
        this.router.navigate(['/dokter-dashboard']);
        break;
      }
      case 'perawat': {
        this.router.navigate(['/perawat-dashboard']);
        break;
      }
      case 'petugasLab': {
        this.router.navigate(['/petugas-lab-dashboard']);
        break;
      }
      case 'petugasAmbulans': {
        this.router.navigate(['/daftar-pemakaian-ambulans']);
        break;
      }
      case 'kasir': {
        this.router.navigate(['/transaksi']);
        break;
      }
      case 'stafApotek': {
        this.router.navigate(['/stok-obat']);
        break;
      }
      case 'gudangUtama': {
        this.router.navigate(['/stok-obat']);
        break;
      }
      case 'frontOffice': {
        this.router.navigate(['/antrian']);
        break;
      }
      default: {
        this.router.navigate(['/daftar-antrian']);
        break;
      }
    }
	}

}
