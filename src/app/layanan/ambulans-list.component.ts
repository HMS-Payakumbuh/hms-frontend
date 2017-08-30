import { Component, OnInit }		from '@angular/core';

import { AuthenticationService }  from '../auth/authentication.service';
import { Ambulans } 					from './ambulans';
import { AmbulansService }		from './ambulans.service';

@Component({
 	selector: 'ambulans-list-page',
 	templateUrl: './ambulans-list.component.html',
 	providers: [AmbulansService]
})

export class AmbulansListComponent implements OnInit {
	allAmbulans: Ambulans[];
	ambulansModal: Ambulans = null;
  ambulansModalNama: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama";
  public sortOrder = "asc";

	constructor(
    private authenticationService: AuthenticationService,
    private ambulansService: AmbulansService
	) {}

	ngOnInit() {
		this.ambulansService.getAllAmbulans().subscribe(
      data => {
        this.allAmbulans = data.filter(ambulans => ambulans.nama != 'Ambulans belum dipilih')
      }
    );
  }
  
  makeAvailable(ambulans: Ambulans) {
    ambulans.status = 'Available';
    this.ambulansService.updateAmbulans(ambulans.nama, ambulans).subscribe(
      data => { this.ngOnInit() }
    );
  }

  newAmbulans() {
    this.ambulansModal = new Ambulans();
    this.ambulansModal.status = "Available";
  }

  createAmbulans() {
    this.ambulansService.createAmbulans(this.ambulansModal).subscribe(
      data => { this.ngOnInit() }
    );
  }

	editAmbulans(nama: string, ambulans: Ambulans) {
    this.ambulansModalNama = nama;
    this.ambulansModal = Object.assign({}, ambulans);
	}

  updateAmbulans() {
    this.ambulansService.updateAmbulans(this.ambulansModalNama, this.ambulansModal).subscribe(
      data => { this.ngOnInit() }
    );
  }

  destroyAmbulans(nama: string) {
    this.ambulansService.destroyAmbulans(nama).subscribe(
      data => { this.ngOnInit() }
    );
  }
}
