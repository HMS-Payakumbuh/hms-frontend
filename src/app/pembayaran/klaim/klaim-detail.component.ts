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
	displayJenisTarif: string;

	constructor(
		private klaimService: KlaimService,
		private transaksiService: TransaksiService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	private determineJenisTarif(input: string): string {
		var res = input.split("");
		if (res.length !== 2) {
			return "Invalid Code";
		}
		if (res[1] === "P") {
			return "Rumah Sakit Pemerintah Kelas " + res[0];
		}
		if (res[1] === "S") {
			return "Rumah Sakit Swasta Kelas " + res[0];
		}
	}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.klaimService.getKlaim(+params['id']))
			.subscribe(klaim => {
				this.klaim = klaim;
				// this.transaksiService.getTransaksi(this.klaim.id_transaksi)
				// .then(transaksi => this.transaksi = transaksi);
				this.displayJenisTarif = this.determineJenisTarif(klaim.kode_tarif);
			});
	}

	goBack(): void {
		this.location.back();
	}
}