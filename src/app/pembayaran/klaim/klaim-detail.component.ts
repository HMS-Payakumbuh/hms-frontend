import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { KlaimService }		from './klaim.service';
import { Klaim }				from './klaim';
import { TransaksiService }		from '../../transaksi/transaksi.service';
import { Transaksi }				from '../../transaksi/transaksi';

@Component({
 	selector: 'klaim-detail-page',
 	templateUrl: './klaim-detail.component.html',
 	providers: [KlaimService, TransaksiService]
})

export class KlaimDetailComponent implements OnInit {
	klaim: Klaim;
	transaksi: Transaksi;

	constructor(
		private klaimService: KlaimService,
		private transaksiService: TransaksiService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.klaimService.getKlaim(+params['id']))
			.subscribe(klaim => {
				this.klaim = klaim;
				this.transaksiService.getTransaksi(this.klaim.id_transaksi)
				.then(transaksi => this.transaksi = transaksi);
			});
	}

	goBack(): void {
		this.location.back();
	}
}