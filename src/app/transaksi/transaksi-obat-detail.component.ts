import 'rxjs/add/operator/switchMap';
import * as _ from "lodash";
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { PembayaranService }		from '../pembayaran/pembayaran.service';
import { TransaksiService }			from './transaksi.service';
import { Transaksi }				from './transaksi';
import { Asuransi }				from '../pasien/asuransi';
import { AsuransiService }		from '../pasien/asuransi.service';

@Component({
 	selector: 'transaksi-obat-detail-page',
 	templateUrl: './transaksi-detail.component.html',
 	providers: [TransaksiService, PembayaranService, AsuransiService]
})

export class TransaksiObatDetailComponent implements OnInit {
	response: any;
	transaksi: any;
	listOfObatTebus: any[] = [];
	listOfObatEceran: any[] = [];
	asuransi: Asuransi;
	allAsuransi: Asuransi[];
	listOfObatTebusId: number[] = [];
	listOfObatEceranId: number[] = [];
	allMetode = [];
	nama_pasien: any;
	jender_pasien: number = 0;
	umur_pasien: number = 0;
	harga_tambahan: number = 0;
	harga_total: number = 0;
	perlu_bayar_tambahan: boolean = true;
	bayar_tambahan: boolean = false;
	total_bayar: number = 0;

	printListOfObatTebus: any[] = [];
	printListOfObatEceran: any[] = [];

	constructor(
		private transaksiService: TransaksiService,
		private pembayaranService: PembayaranService,
		private asuransiService: AsuransiService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {

		this.harga_tambahan = 0;
		this.harga_total = 0;
		this.perlu_bayar_tambahan = true;
		this.total_bayar = 0;
		this.asuransi = new Asuransi(null,'',null);
		this.jender_pasien = 0;
		this.umur_pasien = 0;
		this.bayar_tambahan = false;

		this.listOfObatTebus = [];
		this.listOfObatEceran = [];

		this.listOfObatTebusId = [];
		this.listOfObatEceranId = [];

		this.printListOfObatTebus = [];
		this.printListOfObatEceran = [];
		
		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['id']))
			.subscribe(data => {
				this.response = data;
				this.transaksi = this.response.transaksi;
				this.harga_total = this.transaksi.harga_total;
				if (this.transaksi.pasien !== null) {
					this.nama_pasien = this.transaksi.pasien.nama_pasien;
					this.jender_pasien = this.transaksi.pasien.jender;
					this.calculateAge(this.transaksi.pasien.tanggal_lahir);
					this.asuransiService.getAsuransi(this.transaksi.pasien.id)
						.subscribe(listAsuransi => {
							this.allAsuransi = listAsuransi;
							this.initMetodeList(this.allAsuransi);
						});
				} else {
					if (this.transaksi.obat_tebus.length > 0) {
						this.nama_pasien = this.transaksi.obat_tebus[0].resep.nama;
						this.umur_pasien = this.transaksi.obat_tebus[0].resep.umur;
					} else {
						this.nama_pasien = this.transaksi.obat_eceran[0].nama_pembeli;
					}
				}

				if (this.transaksi.obat_tebus.length > 0) {
					this.initObatTebus(this.transaksi.obat_tebus);
				}

				if (this.transaksi.obat_eceran.length > 0) {
					this.initObatEceran(this.transaksi.obat_eceran);
				}

				console.log(this.transaksi);

			});
	}

	goBack(): void {
		this.location.back();
	}

	initObatTebus(value): void {
		for (let obatTebus of value) {
			for (let item of obatTebus.obat_tebus_item) {
				console.log(item);
				this.listOfObatTebus.push(item);
			}
		}
	}

	initObatEceran(value): void {
		for (let obatEceran of value) {
			for (let item of obatEceran.obat_eceran_item) {
				console.log(item);
				this.listOfObatEceran.push(item);
			}
		}
	}

	gantiAsuransi(value): void {
		if (value == 'tunai') {
			this.asuransi = new Asuransi(null, value, null);
		}
		else {
			for (let asuransi of this.allAsuransi) {
				if (asuransi.nama_asuransi == value) {
					this.asuransi = asuransi;
				}
			}
		}
		console.log(value);
		console.log(this.asuransi);
	}

	private initMetodeList(items: Asuransi[]): void {
		for (let item of _.uniqBy(items, 'nama_asuransi')) {
			this.allMetode.push(item.nama_asuransi);
		}
		let index = this.allMetode.indexOf('bpjs');
		if (index >= 0) {
			this.allMetode.splice(index, 1);
		}
	}

	updateCheckedObatTebus(value): void {
		let html = <HTMLInputElement>document.getElementById('obatTebus' + value);
		if (html.checked == true) {
			this.listOfObatTebusId.push(value);
			this.total_bayar = this.total_bayar + parseInt(value.harga);
		}
		else if (html.checked == false) {
			let index = this.listOfObatTebusId.indexOf(value);
			this.listOfObatTebusId.splice(index, 1);
		}
		console.log(this.listOfObatTebusId);
	}

	updateCheckedObatEceran(value): void {
		let html = <HTMLInputElement>document.getElementById('obatEceran' + value);
		if (html.checked == true) {
			this.listOfObatEceranId.push(value);
		}
		else if (html.checked == false) {
			let index = this.listOfObatEceranId.indexOf(value);
			this.listOfObatEceranId.splice(index, 1);
		}
		console.log(this.listOfObatEceranId);
	}

	calculateAge(tanggal: string): void {
		let birthDate: Date = new Date(tanggal);
		let today: Date = new Date();
		this.umur_pasien = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		    this.umur_pasien--;
		}
		console.log(this.umur_pasien);
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


	private createAsuransi(id: number) {
		this.asuransi.id_pasien = id;
		let asuransi:any = { asuransi: this.asuransi };
		this.asuransiService.createAsuransi(asuransi).subscribe();
	}

	bayar(metode: string = 'tunai'): void {
		let bayar: boolean = false;

		if (this.listOfObatTebusId.length > 0) {
			bayar = true;
		}

		if (this.listOfObatEceranId.length > 0) {
			bayar = true;
		}


		if (bayar) {
			if (metode != 'tunai') {
				this.createAsuransi(this.transaksi.id_pasien);
			}

			this.createPembayaran(this.total_bayar, metode.toLowerCase(), false, this.listOfTindakan, this.listOfObatTebusId, this.listOfObatEceranId, this.listOfKamarRawatInapId);
		}

		this.ngOnInit();
		this.print();
		console.log(metode.toLowerCase());
	}

	createPembayaran(harga: number, metode: string, tambahan: boolean = false, listOfTindakan: number[] = null, listOfObatTebusId: number[] = null, listOfObatEceranId: number[] = null, listOfKamarRawatInapId: number[] = null): void {
		let payload: any = {
			id_transaksi: this.transaksi.id,
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
}
