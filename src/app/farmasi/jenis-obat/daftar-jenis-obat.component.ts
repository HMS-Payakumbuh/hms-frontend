import { Component } from '@angular/core';

import { JenisObat }			from './jenis-obat';
import { JenisObatService }		from './jenis-obat.service';

@Component({
 	selector: 'daftar-jenis-obat-page',
 	templateUrl: './daftar-jenis-obat.component.html',
 	providers: [JenisObatService]
})

export class DaftarJenisObatComponent {
	public allJenisObat: JenisObat[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

    public param;

	constructor(
		private JenisObatService: JenisObatService
	) {}

	ngOnInit(): void {
		this.JenisObatService.getAllJenisObat().subscribe(
			data => { this.allJenisObat = data }
		);
	}

	onClickDatePicker(): void {
		
	}
}