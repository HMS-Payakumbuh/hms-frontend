import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { TransaksiService }		from './transaksi.service';
import { Transaksi }			from './transaksi';

@Component({
 	selector: 'transaksi-detail-page',
 	templateUrl: './transaksi-detail.component.html',
 	providers: [TransaksiService]
})

export class TransaksiDetailComponent implements OnInit {
	transaksi: Transaksi;

	constructor(
		private transaksiService: TransaksiService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['id']))
			.subscribe(transaksi => this.transaksi = transaksi);
	}

	goBack(): void {
		this.location.back();
	}
}