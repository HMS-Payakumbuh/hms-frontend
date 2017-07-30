import { Component } from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { StockOpname }			from './stock-opname';
import { StockOpnameService }		from './stock-opname.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

@Component({
 	selector: 'daftar-stock-opname-page',
 	templateUrl: './daftar-stock-opname.component.html',
 	providers: [StockOpnameService, LokasiObatService]
})

export class DaftarStockOpnameComponent {
	public allStockOpname: StockOpname[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "desc";

    public lokasi: number;
    public lokasiData: LokasiObat;

	constructor(
		private StockOpnameService: StockOpnameService,
		private lokasiObatService: LokasiObatService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.subscribe((params: Params) => {
				this.lokasi = +params['lokasi'];
				this.StockOpnameService.getStockOpnameByLocation(this.lokasi).subscribe(
					data => { 
						this.allStockOpname = data;
					}
				);
			}
		);		
		this.lokasiObatService.getLokasiObat(this.lokasi).subscribe(
			data => this.lokasiData = data
		)	
	}

	onClickDatePicker(): void {
		
	}
}