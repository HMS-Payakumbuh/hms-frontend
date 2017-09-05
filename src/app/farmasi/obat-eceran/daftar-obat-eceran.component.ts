import { Component } from '@angular/core';

import { ObatEceran }			from './obat-eceran';
import { ObatEceranService }		from './obat-eceran.service';

@Component({
 	selector: 'daftar-obat-eceran-page',
 	templateUrl: './daftar-obat-eceran.component.html',
 	providers: [ObatEceranService]
})

export class DaftarObatEceranComponent {
	public allObatEceran: ObatEceran[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "desc";

    public selectedDate;
    public param;
    public config;

	constructor(
		private ObatEceranService: ObatEceranService
	) {}

	ngOnInit(): void {
		this.ObatEceranService.getAllObatEceran().subscribe(
			data => { this.allObatEceran = data }
		);
	}
}