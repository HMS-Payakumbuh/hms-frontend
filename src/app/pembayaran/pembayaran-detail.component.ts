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
	loading: boolean;
	response: any;
	pembayaran: any;
	nama_pasien: any = '';

	constructor(
		private pembayaranService: PembayaranService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.loading = true;
		this.route.params
			.switchMap((params: Params) => this.pembayaranService.getPembayaran(+params['id']))
			.subscribe(data => {
				this.response = data;
				this.pembayaran = this.response.pembayaran;

				if (this.pembayaran.transaksi.pasien !== null) {
					this.nama_pasien = this.pembayaran.transaksi.pasien.nama_pasien;
				} else {
					if (this.pembayaran.transaksi.obat_tebus.length > 0) {
						this.nama_pasien = this.pembayaran.transaksi.obat_tebus[0].resep.nama;
					} else {
						this.nama_pasien = this.pembayaran.transaksi.obat_eceran[0].nama_pembeli;
					}
				}
				console.log(this.pembayaran);
				this.loading = false;
			});
	}

	howLong(tanggal1: string, tanggal2: string): number {
		let one_day = 1000*60*60*24;
		let masuk: Date = new Date(tanggal1);
		let keluar: Date = new Date(tanggal2);

		let masuk_ms = masuk.getTime();
		let keluar_ms = keluar.getTime();

		let days = Math.round((keluar_ms - masuk_ms)/one_day);

		if (days <= 0) {
			days = 1;
		}

		console.log(days);
		return days;
	}

	goBack(): void {
		this.location.back();
	}
}
