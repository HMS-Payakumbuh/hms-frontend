import 'rxjs/add/operator/switchMap';
import * as _ from "lodash";
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params, Router }	from '@angular/router';
import { Location }					from '@angular/common';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { PembayaranService }		from '../pembayaran/pembayaran.service';
import { TransaksiEksternalService }			from './transaksi-eksternal.service';
import { Transaksi }				from './transaksi';
import { Asuransi }				from '../pasien/asuransi';
import { AsuransiService }		from '../pasien/asuransi.service';

@Component({
 	selector: 'transaksi-eksternal-detail-page',
 	templateUrl: './transaksi-detail.component.html',
 	providers: [TransaksiEksternalService, PembayaranService]
})

export class TransaksiEksternalDetailComponent implements OnInit {
	response: any;
	transaksi: any;
	loading: boolean;
	listOfObatTebus: any[] = [];
	listOfObatEceran: any[] = [];
	asuransi: Asuransi;
	allAsuransi: Asuransi[];
	listOfObatTebusId: number[] = [];
	listOfObatEceranId: number[] = [];
	nama_pasien: any;
	jender_pasien: number = 0;
	umur_pasien: number = 0;
	harga_tambahan: number = 0;
	harga_total: number = 0;
	perlu_bayar_tambahan: boolean = true;
	bayar_tambahan: boolean = false;
	total_bayar: number = 0;
	transaksi_obat: boolean;
	transaksi_eksternal: boolean;
	no_pembayaran: string = '';

	printListOfObatTebus: any[] = [];
	printListOfObatEceran: any[] = [];

	constructor(
		private transaksiEksternalService: TransaksiEksternalService,
		private pembayaranService: PembayaranService,
		private toastyService: ToastyService, 
		private toastyConfig: ToastyConfig,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.loading = true;
		this.transaksi_obat = false;
		this.transaksi_eksternal = true;
		this.harga_tambahan = 0;
		this.harga_total = 0;
		this.perlu_bayar_tambahan = true;
		this.total_bayar = 0;
		this.asuransi = new Asuransi(null,'',null);
		this.jender_pasien = 0;
		this.umur_pasien = 0;
		this.bayar_tambahan = false;
		this.no_pembayaran = '';

		this.listOfObatTebus = [];
		this.listOfObatEceran = [];

		this.listOfObatTebusId = [];
		this.listOfObatEceranId = [];

		this.printListOfObatTebus = [];
		this.printListOfObatEceran = [];
		
		this.route.params
			.switchMap((params: Params) => this.transaksiEksternalService.getTransaksi(+params['id']))
			.subscribe(data => {
				this.response = data;
				this.transaksi = this.response.transaksi;
				this.transaksi.tindakan = [];
				this.nama_pasien = this.transaksi.nama;
				this.umur_pasien = this.transaksi.umur;

				if (this.transaksi.obat_tebus.length > 0) {
					this.initObatTebus(this.transaksi.obat_tebus);
				}

				if (this.transaksi.obat_eceran.length > 0) {
					this.initObatEceran(this.transaksi.obat_eceran);
				}

				console.log(this.transaksi);

				this.loading = false;
			});
	}

	goBack(): void {
		this.router.navigateByUrl('/histori-transaksi');
	}

	initObatTebus(value): void {
		for (let obatTebus of value) {
			for (let item of obatTebus.obat_tebus_item) {
				console.log(item);
				this.listOfObatTebus.push(item);
				if (item.id_pembayaran === null) {
					this.printListOfObatTebus.push(item);
					this.harga_total += item.jumlah * item.harga_jual_realisasi;
					this.total_bayar = this.total_bayar + (parseInt(item.jumlah) * parseInt(item.harga_jual_realisasi));
				}
			}
		}
	}

	initObatEceran(value): void {
		for (let obatEceran of value) {
			for (let item of obatEceran.obat_eceran_item) {
				console.log(item);
				this.listOfObatEceran.push(item);
				if (item.id_pembayaran === null) {
					this.printListOfObatEceran.push(item);
					this.harga_total += item.jumlah * item.harga_jual_realisasi;
					this.total_bayar = this.total_bayar + (parseInt(item.jumlah) * parseInt(item.harga_jual_realisasi));
				}
			}
		}
	}

	bayar(metode: string = 'tunai'): void {
		let bayar: boolean = false;
		let total_harga: number = 0;

		for (let i of this.listOfObatTebus) {
			if (i.id_pembayaran === null) {
				total_harga += parseInt(i.harga_jual_realisasi) * parseInt(i.jumlah);
				this.listOfObatTebusId.push(i.id);
			}
		}

		for (let i of this.listOfObatEceran) {
			if (i.id_pembayaran === null) {
				total_harga += parseInt(i.harga_jual_realisasi) * parseInt(i.jumlah);
				this.listOfObatEceranId.push(i.id);
			}
		}

		if (this.listOfObatTebusId.length > 0) {
			bayar = true;
		}

		if (this.listOfObatEceranId.length > 0) {
			bayar = true;
		}

		if (bayar) {
			this.createPembayaran(this.total_bayar, metode.toLowerCase(), false, null, this.listOfObatTebusId, this.listOfObatEceranId, null);
		}
		console.log(metode.toLowerCase());
	}

	createPembayaran(harga: number, metode: string, tambahan: boolean = false, listOfTindakan: number[] = null, listOfObatTebusId: number[] = null, listOfObatEceranId: number[] = null, listOfKamarRawatInapId: number[] = null): void {
		let payload: any = {
			id_transaksi: 0,
			id_transaksi_eksternal: this.transaksi.id,
			harga_bayar: harga,
			metode_bayar: metode,
			tindakan: listOfTindakan,
			obatTebus: listOfObatTebusId,
			obatEceran: listOfObatEceranId,
			kamarRawatInap: listOfKamarRawatInapId
		};

		if (tambahan) {
			payload['pembayaran_tambahan'] = 1;
		}
		else {
			payload['pembayaran_tambahan'] = 0;
		}

		let request: any = {
			pembayaran: payload
		};

		console.log(request);
		this.pembayaranService.createPembayaran(request)
		.subscribe(data => {
			console.log(data);
			this.no_pembayaran = data.pembayaran.no_pembayaran;
			console.log(this.no_pembayaran);
			this.toastyService.success(this.toast_success(this.no_pembayaran));
			setTimeout(() => this.print(), 1000);
			setTimeout(() => this.ngOnInit(), 1000);
		},
		error => {
			console.log(error);
			this.toastyService.error(this.toast_fail(error));
		});
	}

	print(): void {
	    let printContents, popupWin;
	    printContents = document.getElementById('invoice').innerHTML;
	    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
	    popupWin.document.open();
	    popupWin.document.write(`
			<html>
				<head>
				<title>${this.transaksi.no_transaksi}</title>
				<script src="node_modules/core-js/client/shim.min.js"></script>

				<script src="node_modules/zone.js/dist/zone.js"></script>
				<script src="node_modules/systemjs/dist/system.src.js"></script>
				<script src="https://cdn.socket.io/socket.io-1.3.4.js"></script>

				<script src="systemjs.config.js"></script>
				<script>
				  System.import('main.js').catch(function(err){ console.error(err); });
				</script>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
				<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
				<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
				<link rel="stylesheet" href="styles.css">
				</head>
				<body onload="window.print();window.close()">
					${printContents}
				</body>
			</html>
		`);
	    popupWin.document.close();
	}

	private toast_success(no_pembayaran) {
		let toastOptions:ToastOptions = {
			title: "Pembayaran Berhasil",
			msg: no_pembayaran,
			showClose: true,
			timeout: 5000,
			theme: 'material'
		};

		return toastOptions;
	}

	private toast_fail(error) {
		let toastOptions:ToastOptions = {
			title: "Pembayaran Gagal",
			msg: error,
			showClose: true,
			timeout: 5000,
			theme: 'material'
		};

		return toastOptions;
	}
}
