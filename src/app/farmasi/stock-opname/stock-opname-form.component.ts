import { Component } from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { StokObat }			from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

import { StockOpname }			from './stock-opname';
import { StockOpnameItem }			from './stock-opname-item';
import { StockOpnameService }		from './stock-opname.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

@Component({
 	selector: 'stock-opname-form-page',
 	templateUrl: './stock-opname-form.component.html',
 	providers: [StokObatService, StockOpnameService, LokasiObatService]
})

export class StockOpnameFormComponent {
	public allStokObat: StokObat[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

    public lokasi: number;
    public lokasiData: LokasiObat;

	constructor(
		private stokObatService: StokObatService,
		private stockOpnameService: StockOpnameService,
		private lokasiObatService: LokasiObatService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.subscribe((params: Params) => {
				this.lokasi = +params['lokasi'];
				this.stokObatService.getStokObatByLocation(this.lokasi).subscribe(
					data => this.allStokObat = data					
				);
			}
		);	
		this.lokasiObatService.getLokasiObat(this.lokasi).subscribe(
			data => this.lokasiData = data
		)	
	}
}