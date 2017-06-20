import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { PembayaranService }		from './pembayaran.service';
import { Pembayaran }				from './pembayaran';

@Component({
 	selector: 'pembayaran-detail-page',
 	templateUrl: './pembayaran-detail.component.html',
 	providers: [PembayaranService]
})

export class PembayaranDetailComponent implements OnInit {
	pembayaran: Pembayaran;

	constructor(
		private pembayaranService: PembayaranService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.pembayaranService.getPembayaran(+params['id']))
			.subscribe(pembayaran => this.pembayaran = pembayaran);
	}

	goBack(): void {
		this.location.back();
	}
}