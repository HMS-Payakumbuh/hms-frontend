import { Component } from '@angular/core';

import { ObatPindah }			from './obat-pindah';
import { ObatPindahService }		from './obat-pindah.service';

@Component({
 	selector: 'daftar-obat-pindah-page',
 	templateUrl: './daftar-obat-pindah.component.html',
 	providers: [ObatPindahService]
})

export class DaftarObatPindahComponent {
	public allObatPindah: ObatPindah[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "waktu_keluar";
    public sortOrder = "asc";

	constructor(
		private ObatPindahService: ObatPindahService
	) {}

	ngOnInit(): void {
		this.ObatPindahService.getAllObatPindah().subscribe(
			data => { this.allObatPindah = data }
		);
	}

	onClickDatePicker(): void {
		
	}
}