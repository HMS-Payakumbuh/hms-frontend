import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { PembayaranService }		from '../pembayaran/pembayaran.service';
import { TransaksiService }			from './transaksi.service';
import { Transaksi }				from './transaksi';

@Component({
 	selector: 'transaksi-detail-page',
 	templateUrl: './transaksi-detail.component.html',
 	providers: [TransaksiService, PembayaranService]
})

export class TransaksiDetailComponent implements OnInit {
	response: any;
	transaksi: any;
	umur: number = 0;

	constructor(
		private transaksiService: TransaksiService,
		private pembayaranService: PembayaranService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['id']))
			.subscribe(data => {
				this.response = data;
				this.transaksi = this.response.transaksi;
				console.log(this.transaksi);
				this.calculateAge(this.transaksi.pasien.tanggal_lahir);
			});
	}

	goBack(): void {
		this.location.back();
	}

	calculateAge(tanggal: string): void {
		let birthDate: Date = new Date(tanggal);
		let today: Date = new Date();
		this.umur = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		    this.umur--;
		}
		console.log(this.umur);
	}

	createPembayaran(harga: number, metode: string): void {
		let payload: any = {
			id_transaksi: this.transaksi.id,
			harga_bayar: harga,
			metode_bayar: metode
		};
		let request: any = {
			pembayaran: payload
		};

		let payloadTransaksi: any = {
			status: 'closed'
		};
		let transaksiRequest: any = {
			transaksi: payloadTransaksi
		}

		console.log(request);
		this.pembayaranService.createPembayaran(request)
			.subscribe(data => {
				console.log(data);
				this.transaksiService.updateTransaksi(transaksiRequest, this.transaksi.id)
					.subscribe(data => {
						window.location.reload();
						console.log(data);
					});
			});
	}
}