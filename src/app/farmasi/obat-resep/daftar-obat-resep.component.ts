import { Component } from '@angular/core';

import { ObatResep }			from './obat-resep';
import { ObatResepService }		from './obat-resep.service';

@Component({
 	selector: 'daftar-obat-resep-page',
 	templateUrl: './daftar-obat-resep.component.html',
 	providers: [ObatResepService]
})

export class DaftarObatResepComponent {
	public allObatResep: ObatResep[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

	constructor(
		private ObatResepService: ObatResepService
	) {}

	ngOnInit(): void {
		this.ObatResepService.getAllObatResep()
			.then(allObatResep => this.allObatResep = allObatResep);
	}
}