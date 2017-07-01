import { Component } from '@angular/core';

import { StokObat }			from './stok-obat';
import { StokObatService }		from './stok-obat.service';

@Component({
 	selector: 'daftar-stok-obat-page',
 	templateUrl: './daftar-stok-obat.component.html',
 	providers: [StokObatService]
})

export class DaftarStokObatComponent {
	public allStokObat: StokObat[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

	constructor(
		private StokObatService: StokObatService
	) {}

	ngOnInit(): void {
		this.StokObatService.getAllStokObat().subscribe(
			data => { this.allStokObat = data }
		);
	}
}