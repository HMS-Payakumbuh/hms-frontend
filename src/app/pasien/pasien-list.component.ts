import { Component } from '@angular/core';

import { Pasien }	from './pasien';
import { PasienService }		from './pasien.service';

@Component({
 	selector: 'pasien-list',
 	templateUrl: './pasien-list.component.html',
 	providers: [PasienService]
})

export class PasienListComponent {
	public allPasien: Pasien[];
	public pasien: Pasien = null;
	public pasienId: number= null;
	public search: string;

	public filterQuery = "";
 	public rowsOnPage = 10;
	public sortBy = "id";
	public sortOrder = "asc";

	public allJender = [{id: 1, nama: 'Laki-laki'}, {id: 2, nama:'Perempuan'}];

  	public allAgama = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  	public bloodTypes = ['A', 'B', 'O', 'AB'];

	constructor(
		private pasienService: PasienService
	) {}

	private editPasien(id: number, pasien: Pasien): void {
		this.pasienId = id;
		this.pasien = Object.assign({}, pasien);
	}

	private updatePasien() {
	    this.pasienService.updatePasien(this.pasienId, this.pasien).subscribe(
	      data => { window.location.reload() }
	    );
	}

	private destroyPasien(id: number) {
	    this.pasienService.destroyPasien(id).subscribe(
	      data => { window.location.reload() }
	    );
	}

	private searchPasien() {
	if (this.search) {
		if (this.search.match(/\d/)) {
	      this.allPasien = [];
	      this.pasienService.getPasien(this.search)
	        .subscribe(allPasien => {
	        	if (allPasien)
		          this.allPasien.push(allPasien);
	        });
	    } else {
	       this.pasienService.getPasienByName(this.search)
	        .subscribe(allPasien => this.allPasien = allPasien);
	    }
	}
  }
}