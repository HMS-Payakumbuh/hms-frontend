import { Component } from '@angular/core';

import { ObatTebus }			from './obat-tebus';
import { ObatTebusService }		from './obat-tebus.service';

@Component({
 	selector: 'daftar-obat-tebus-page',
 	templateUrl: './daftar-obat-tebus.component.html',
 	providers: [ObatTebusService]
})

export class DaftarObatTebusComponent {
	public allObatTebus: ObatTebus[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

	constructor(
		private ObatTebusService: ObatTebusService
	) {}

	ngOnInit(): void {
		this.ObatTebusService.getAllObatTebus()
			.then(allObatTebus => this.allObatTebus = allObatTebus);
	}
}