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
		this.pasienService.getAllPasien()
			.then(allPasien => this.allPasien = allPasien);
	}

	editPasien(pasien: Pasien): void {
		this.pasien = pasien;
	}
}