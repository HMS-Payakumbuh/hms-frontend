import { Component } from '@angular/core';

import { ObatMasuk }			from './obat-masuk';
import { ObatMasukService }		from './obat-masuk.service';

@Component({
 	selector: 'daftar-obat-masuk-page',
 	templateUrl: './daftar-obat-masuk.component.html',
 	providers: [ObatMasukService]
})

export class DaftarObatMasukComponent {
	public allObatMasuk: ObatMasuk[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "waktu_masuk";
    public sortOrder = "asc";

	constructor(
		private ObatMasukService: ObatMasukService
	) {}

	ngOnInit(): void {
		this.ObatMasukService.getAllObatMasuk()
			.then(allObatMasuk => this.allObatMasuk = allObatMasuk);
	}
}