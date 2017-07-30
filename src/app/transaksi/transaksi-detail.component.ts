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
 	selector: 'transaksi-detail-page',
 	templateUrl: './transaksi-detail.component.html',
 	providers: [TransaksiService, PembayaranService, AsuransiService]
})

export class TransaksiDetailComponent implements OnInit {
	response: any;
	transaksi: any;
	listOfObatTebus: any[] = [];
	listOfObatEceran: any[] = [];
	listOfKamarRawatInap: any[] = [];
	asuransi: Asuransi;
	allAsuransi: Asuransi[];
	listOfTindakan: number[] = [];
	listOfObatTebusId: number[] = [];
	listOfObatEceranId: number[] = [];
	listOfKamarRawatInapId: number[] = [];
	allMetode = [];
	nama_pasien: any;
	jender_pasien: number = 0;
	umur_pasien: number = 0;
	harga_tambahan: number = 0;
	harga_total: number = 0;
	perlu_bayar_tambahan: boolean = true;
	bayar_tambahan: boolean = false;
	total_bayar: number = 0;

	printListOfTindakan: any[] = [];
	printListOfKamarRawatInap: any[] = [];

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
		this.listOfKamarRawatInap = [];

		this.listOfTindakan = [];
		this.listOfObatTebusId = [];
		this.listOfObatEceranId = [];
		this.listOfKamarRawatInapId = [];

		this.printListOfTindakan = [];
		this.printListOfKamarRawatInap = [];
		
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

				if (this.transaksi.tindakan.length > 0) {
					this.initTotalHarga();
				}

				if (this.transaksi.obat_tebus.length > 0) {
					this.initObatTebus(this.transaksi.obat_tebus);
				}

				if (this.transaksi.obat_eceran.length > 0) {
					this.initObatEceran(this.transaksi.obat_eceran);
				}

				if (this.transaksi.pembayaran.length > 0) {
					for (let item of this.transaksi.pembayaran) {
						if (item.pembayaran_tambahan == 1) {
							this.perlu_bayar_tambahan = false;
						}
					}
				}

				if (this.transaksi.pemakaian_kamar_rawat_inap.length > 0) {
					this.initRawatInap(this.transaksi.pemakaian_kamar_rawat_inap);
				}

				console.log(this.transaksi);

			});
	}

	goBack(): void {
		this.location.back();
	}

	initTotalHarga(): void {
		for (let item of this.transaksi.tindakan) {
			if (this.transaksi.no_sep !== null) {
				this.harga_total -= item.harga;
			}
			else {
				if (item.id_pembayaran !== null) {
					this.harga_total -= item.harga;
				}
			}
		}
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

	initRawatInap(value): void {
		for (let item of value) {
			if (item.waktu_keluar !== null) {
				console.log(item);
				this.listOfKamarRawatInap.push(item);
				
				if (this.transaksi.no_sep !== null) {
					this.harga_total -= item.harga;
				} 
				else {
					if (item.id_pembayaran !== null) {
						this.harga_total -= item.harga;
					}
				}
			}
		}

		if (this.transaksi.no_sep !== null && this.perlu_bayar_tambahan === true) {
			this.route.params
				.switchMap((params: Params) => this.transaksiService.getStatusBpjs(+params['id']))
				.subscribe(data => {
					let response = data;
					let status_bpjs = data.status_bpjs;
					if (status_bpjs.grouper.response !== null) {
						this.harga_tambahan = status_bpjs.grouper.response.add_payment_amt;
						if (this.harga_tambahan > 0) {
							this.harga_total += this.harga_tambahan;
						}
						console.log(this.harga_tambahan);
					}
				});
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

	updateCheckedBayarTambahan(): void {
		let html = <HTMLInputElement>document.getElementById('bayarTambahan');
		if (html.checked == true) {
			this.bayar_tambahan = true;
			this.total_bayar += this.harga_tambahan;
		}
		else if (html.checked == false) {
			this.bayar_tambahan = false;
			this.total_bayar -= this.harga_tambahan;
		}
		console.log(this.total_bayar);
	}

	updateCheckedTindakan(value): void {
		let html = <HTMLInputElement>document.getElementById('tindakan' + value.id);
		if (html.checked == true) {
			this.listOfTindakan.push(value.id);
			this.printListOfTindakan.push(value);
			this.total_bayar = this.total_bayar + parseInt(value.harga);
		}
		else if (html.checked == false) {
			let index1 = this.listOfTindakan.indexOf(value.id);
			let index2 = this.printListOfTindakan.indexOf(value);
			this.listOfTindakan.splice(index1, 1);
			this.printListOfTindakan.splice(index2, 1);
			this.total_bayar = this.total_bayar - parseInt(value.harga);
		}
		console.log(this.listOfTindakan);
		console.log(this.printListOfTindakan);
		console.log(this.total_bayar);
	}

	updateCheckedObatTebus(value): void {
		let html = <HTMLInputElement>document.getElementById('obatTebus' + value);
		if (html.checked == true) {
			this.listOfObatTebusId.push(value);
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

	updateCheckedKamarRawatInap(value): void {
		let html = <HTMLInputElement>document.getElementById('kamarRawatInap' + value.id);
		if (html.checked == true) {
			this.listOfKamarRawatInapId.push(value.id);
			this.printListOfKamarRawatInap.push(value);
			this.total_bayar = this.total_bayar + parseInt(value.harga);
		}
		else if (html.checked == false) {
			let index1 = this.listOfKamarRawatInapId.indexOf(value.id);
			let index2 = this.printListOfKamarRawatInap.indexOf(value);
			this.listOfKamarRawatInapId.splice(index1, 1);
			this.printListOfKamarRawatInap.splice(index2, 1);
			this.total_bayar = this.total_bayar - parseInt(value.harga);
		}
		console.log(this.listOfKamarRawatInapId);
		console.log(this.printListOfKamarRawatInap);
		console.log(this.total_bayar);
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

	close(): void {
		let total_harga: number = 0;
		let listOfTindakan: number[] = [];
		let listOfObatTebusId: number[] = [];
		let listOfObatEceranId: number[] = [];
		let listOfKamarRawatInapId: number[]= [];
		for (let i of this.transaksi.tindakan) {
			if (i.id_pembayaran === null) {
				total_harga += parseInt(i.harga);
				listOfTindakan.push(i.id);
			}
		}

		for (let i of this.listOfObatTebus) {
			if (i.id_pembayaran === null) {
				total_harga += parseInt(i.harga_jual_realisasi) * parseInt(i.jumlah);
				listOfObatTebusId.push(i.id);
			}
		}

		for (let i of this.listOfObatEceran) {
			if (i.id_pembayaran === null) {
				total_harga += parseInt(i.harga_jual_realisasi) * parseInt(i.jumlah);
				listOfObatEceranId.push(i.id);
			}
		}

		for (let i of this.listOfKamarRawatInap) {
			if (i.id_pembayaran === null) {
				total_harga += parseInt(i.harga);
				listOfKamarRawatInapId.push(i.id);
			}
		}

		this.createPembayaran(total_harga, this.transaksi.asuransi_pasien, false, listOfTindakan, listOfObatTebusId, listOfObatEceranId, listOfKamarRawatInapId);
		
		let payload: any = {
			status: 'closed'
		};
		let transaksi: any = {
			transaksi: payload
		};

		this.transaksiService.updateTransaksi(transaksi, this.transaksi.id)
		.subscribe(data => {
			console.log(data);
		});
	}

	private createAsuransi(id: number) {
		this.asuransi.id_pasien = id;
		let asuransi:any = { asuransi: this.asuransi };
		this.asuransiService.createAsuransi(asuransi).subscribe();
	}

	bayar(metode: string = 'tunai'): void {
		let bayar: boolean = false;

		if (this.listOfTindakan.length > 0) {
			bayar = true;
		}

		if (this.listOfObatTebusId.length > 0) {
			bayar = true;
		}

		if (this.listOfObatEceranId.length > 0) {
			bayar = true;
		}

		if (this.listOfKamarRawatInapId.length > 0) {
			bayar = true;
		}

		if (this.bayar_tambahan == true) {
			this.createPembayaran(this.harga_tambahan, metode.toLowerCase(), true);
		}

		if (bayar) {
			if (metode != 'tunai') {
				this.createAsuransi(this.transaksi.id_pasien);
			}

			if (this.bayar_tambahan == true) {
				this.createPembayaran(this.total_bayar - this.harga_tambahan, metode.toLowerCase(), false, this.listOfTindakan, this.listOfObatTebusId, this.listOfObatEceranId, this.listOfKamarRawatInapId);
			}
			else {
				this.createPembayaran(this.total_bayar, metode.toLowerCase(), false, this.listOfTindakan, this.listOfObatTebusId, this.listOfObatEceranId, this.listOfKamarRawatInapId);
			}
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
