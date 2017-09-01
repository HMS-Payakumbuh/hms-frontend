import { Component } from '@angular/core';

import { ObatTindakan }			from './obat-tindakan';
import { ObatTindakanService }		from './obat-tindakan.service';

@Component({
 	selector: 'daftar-obat-tindakan-page',
 	templateUrl: './daftar-obat-tindakan.component.html',
 	providers: [ObatTindakanService]
})

export class DaftarObatTindakanComponent {
	public allObatTindakan: ObatTindakan[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "desc";

	constructor(
		private ObatTindakanService: ObatTindakanService
	) {}

	ngOnInit(): void {
		this.ObatTindakanService.getAllObatTindakan().subscribe(
			data => { this.allObatTindakan = data }
		);
	}

	onClickDatePicker(): void {
		
	}
}