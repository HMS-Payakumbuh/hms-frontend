import { Component } from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { StockOpname }			from './stock-opname';
import { StockOpnameService }		from './stock-opname.service';

@Component({
 	selector: 'daftar-stock-opname-page',
 	templateUrl: './daftar-stock-opname.component.html',
 	providers: [StockOpnameService]
})

export class DaftarStockOpnameComponent {
	public allStockOpname: StockOpname[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

	constructor(
		private StockOpnameService: StockOpnameService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.StockOpnameService.getStockOpnameByLocation(+params['lokasi'])).subscribe(
			data => { this.allStockOpname = data }
		);		
	}

	onClickDatePicker(): void {
		
	}
}