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
	public pasien: Pasien;
	public search: string;

	public filterQuery = "";
 	public rowsOnPage = 10;
	public sortBy = "id";
	public sortOrder = "asc";

	public allJender = ['Laki-laki', 'Perempuan'];

  	public allAgama = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

	constructor(
		private pasienService: PasienService
	) {}

	ngOnInit(): void {
		// this.pasienService.getAllPasien()
		// 	.then(allPasien => this.allPasien = allPasien);
	}

	private editPasien(pasien: Pasien): void {
		this.pasien = pasien;
	}

	private searchPasien() {
    if (this.search.match(/([1-9][0-9]*)/)) {
      this.allPasien = [];
      this.pasienService.getPasien(parseInt(this.search))
        .then(allPasien => {
          this.allPasien.push(allPasien);
        });
    } else {
       this.pasienService.getPasienByName(this.search)
        .then(allPasien => this.allPasien = allPasien);
    }
  }
}