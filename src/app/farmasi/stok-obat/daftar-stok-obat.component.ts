import { Component } from '@angular/core';

import { StokObat }			from './stok-obat';
import { StokObatService }		from './stok-obat.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

@Component({
 	selector: 'daftar-stok-obat-page',
 	templateUrl: './daftar-stok-obat.component.html',
 	providers: [StokObatService, LokasiObatService]
})

export class DaftarStokObatComponent {
	public allStokObat: StokObat[];
	public allLokasiObat: LokasiObat[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

    public lokasi;
    public param;
    public config;

	constructor(
		private stokObatService: StokObatService,
		private lokasiObatService: LokasiObatService
	) {}

	ngOnInit(): void {
		this.stokObatService.getAllStokObat().subscribe(
			data => { this.allStokObat = data }
		);
		this.lokasiObatService.getAllLokasiObat().subscribe(
			data => { this.allLokasiObat = data }
		);
	}
}