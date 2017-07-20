import { Component } from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { StockOpname }			from './stock-opname';
import { StockOpnameService }		from './stock-opname.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

@Component({
 	selector: 'selector-stock-opname-page',
 	templateUrl: './selector-stock-opname.component.html',
 	providers: [StockOpnameService, LokasiObatService]
})

export class SelectorStockOpnameComponent {

	public allLokasiObat: LokasiObat[];

	public lokasi: number;

	constructor(
		private stockOpnameService: StockOpnameService,
		private lokasiObatService: LokasiObatService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.lokasiObatService.getAllLokasiObat().subscribe(
			data => { this.allLokasiObat = data }
		);
	}

	onClickDatePicker(): void {
		
	}
}