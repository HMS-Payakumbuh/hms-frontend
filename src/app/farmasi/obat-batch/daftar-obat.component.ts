import { Component } from '@angular/core';

import { ObatBatch }			from './obat-batch';
import { ObatBatchService }		from './obat-batch.service';

@Component({
 	selector: 'daftar-obat-page',
 	templateUrl: './daftar-obat.component.html',
 	providers: [ObatBatchService]
})

export class DaftarObatComponent {
	public allObatBatch: ObatBatch[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "kode_obat";
    public sortOrder = "asc";

	constructor(
		private ObatBatchService: ObatBatchService
	) {}

	ngOnInit(): void {
		this.ObatBatchService.getAllObatBatch()
			.then(allObatBatch => this.allObatBatch = allObatBatch);
	}
}