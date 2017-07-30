import { Component, OnInit, Input }		from '@angular/core';
import { Router }                     from '@angular/router';

@Component({
 	selector: 'home-page',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

	constructor(
    private router: Router
	) {}

	ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    switch (user.role) {
      case 'dokter': {
        this.router.navigate(['/dokter-dashboard']);
        break;
      }
      case 'petugasLab': {
        this.router.navigate(['/petugas-lab-dashboard'])
        break;
      }
      default: {
        this.router.navigate(['/pendaftaran']);
        break;
      }
    }
	}

}
