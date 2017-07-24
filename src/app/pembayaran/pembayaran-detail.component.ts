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
	response: any;
	pembayaran: any;
	nama_pasien: any = '';

	constructor(
		private pembayaranService: PembayaranService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
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
			});
	}

	howLong(tanggal: string): number {
		let date: Date = new Date(tanggal);
		let today: Date = new Date();
		let days = 1;
		if (today.getDate() != date.getDate()) {
		 	days = today.getDate() - date.getDate();
		}

    console.log(days);
		return days;
	}

	goBack(): void {
		this.location.back();
	}
}
