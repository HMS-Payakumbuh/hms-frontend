import { Component } from '@angular/core';

import { JenisObat }			from './jenis-obat';
import { JenisObatService }		from './jenis-obat.service';

@Component({
 	selector: 'daftar-jenis-obat-page',
 	templateUrl: './daftar-jenis-obat.component.html',
 	providers: [JenisObatService]
})

export class DaftarJenisObatComponent {
	allJenisObat: JenisObat[];

	constructor(
		private JenisObatService: JenisObatService
	) {}

	ngOnInit(): void {
		this.JenisObatService.getAllJenisObat()
			.then(allJenisObat => this.allJenisObat = allJenisObat);
	}

	onClickDatePicker(): void {
		
	}
}