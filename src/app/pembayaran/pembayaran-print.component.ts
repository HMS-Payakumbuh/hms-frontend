import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { PembayaranService }		from './pembayaran.service';
import { Pembayaran }				from './pembayaran';

@Component({
 	selector: 'pembayaran-print-page',
 	templateUrl: './pembayaran-print.component.html',
 	providers: [PembayaranService]
})

export class PembayaranPrintComponent implements OnInit {
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

	ngAfterViewChecked() {
		this.print();
		this.goBack();
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

	print(): void {
	    let printContents, popupWin;
	    printContents = document.getElementById('invoice').innerHTML;
	    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
	    popupWin.document.open();
	    popupWin.document.write(`
			<html>
				<head>
				<title></title>
				<style>
				</style>
				</head>
				<body onload="window.print();window.close()">
					${printContents}
				</body>
			</html>
		`);
	    popupWin.document.close();
	}
}