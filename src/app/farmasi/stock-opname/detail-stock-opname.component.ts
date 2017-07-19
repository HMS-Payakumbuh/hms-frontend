import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { StockOpname }			from './stock-opname';
import { StockOpnameService }		from './stock-opname.service';

@Component({
 	selector: 'detail-stock-opname-page',
 	templateUrl: './detail-stock-opname.component.html',
 	providers: [StockOpnameService]
})

export class DetailStockOpnameComponent {
	public stockOpname: StockOpname;

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

	constructor(
		private stockOpnameService: StockOpnameService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.stockOpnameService.getStockOpname(+params['id']))
			.subscribe(stockOpname => this.stockOpname = stockOpname);
	}

	goBack(): void {
		this.location.back();
	}
}