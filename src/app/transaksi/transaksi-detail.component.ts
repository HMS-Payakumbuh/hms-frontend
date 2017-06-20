import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { TransaksiService }			from './transaksi.service';
import { Transaksi }				from './transaksi';
import { PembayaranService }		from '../pembayaran/pembayaran.service';
import { Pembayaran }				from '../pembayaran/pembayaran';
import { PasienService }			from '../pasien/pasien.service';
import { Pasien }					from '../pasien/pasien';

@Component({
 	selector: 'transaksi-detail-page',
 	templateUrl: './transaksi-detail.component.html',
 	providers: [TransaksiService, PembayaranService, PasienService]
})

export class TransaksiDetailComponent implements OnInit {
	transaksi: Transaksi;
	allPembayaran: Pembayaran[] = [];
	pasien: Pasien;

	constructor(
		private transaksiService: TransaksiService,
		private pembayaranService: PembayaranService,
		private pasienService: PasienService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['id']))
			.subscribe(transaksi => this.transaksi = transaksi);

		this.route.params
			.switchMap((params: Params) => this.pasienService.getPasien(+params['id']))
			.subscribe(pasien => this.pasien = pasien);

		this.route.params
			.switchMap((params: Params) => this.pembayaranService.getPembayaranByTransaksi(+params['id']))
			.subscribe(pembayaran => this.allPembayaran = pembayaran);
	}

	goBack(): void {
		this.location.back();
	}
}