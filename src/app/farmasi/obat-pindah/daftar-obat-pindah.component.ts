import { Component } from '@angular/core';

import { ObatPindah }			from './obat-pindah';
import { ObatPindahService }		from './obat-pindah.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

@Component({
 	selector: 'daftar-obat-pindah-page',
 	templateUrl: './daftar-obat-pindah.component.html',
 	providers: [ObatPindahService, LokasiObatService]
})

export class DaftarObatPindahComponent {
	public allObatPindah: ObatPindah[];
	public allLokasiObat: LokasiObat[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "desc";

	constructor(
		private obatPindahService: ObatPindahService,		
		private lokasiObatService: LokasiObatService
	) {}

	ngOnInit(): void {
		this.obatPindahService.getAllObatPindah().subscribe(
			data => { this.allObatPindah = data }
		);
		this.lokasiObatService.getAllLokasiObat().subscribe(
			data => { this.allLokasiObat = data }
		);
	}

	onClickDatePicker(): void {
		
	}
}