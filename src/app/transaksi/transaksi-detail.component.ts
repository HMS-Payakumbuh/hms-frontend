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
	listObat: any[] = [];
	listOfKamarRawatInap: any[] = [];
	asuransi: Asuransi;
	allAsuransi: Asuransi[];
	listOfTindakan: number[] = [];
	listOfObatTebusId: number[] = [];
	listOfKamarRawatInapId: number[] = [];
	allMetode = [];
	nama_pasien: any;
	jender_pasien: number = 0;
	umur_pasien: number = 0;
	harga_tambahan: number = 0;
	harga_total: number = 0;
	perlu_bayar_tambahan: boolean = false;
	bayar_tambahan: boolean = false;
	total_bayar: number = 0;
	transaksi_obat: boolean;
	transaksi_eksternal: boolean;
	no_pembayaran: string = '';

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
		this.transaksi_obat = false;
		this.transaksi_eksternal = false;
		this.harga_tambahan = 0;
		this.harga_total = 0;
		this.perlu_bayar_tambahan = false;
		this.total_bayar = 0;
		this.asuransi = new Asuransi(null,'',null);
		this.jender_pasien = 0;
		this.umur_pasien = 0;
		this.bayar_tambahan = false;
		this.no_pembayaran = '';

		this.listOfObatTebus = [];
		this.listObat = [];
		this.listOfKamarRawatInap = [];

		this.listOfTindakan = [];
		this.listOfObatTebusId = [];
		this.listOfKamarRawatInapId = [];

		this.printListOfTindakan = [];
		this.printListOfKamarRawatInap = [];
		
		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['id']))
			.subscribe(data => {
				this.response = data;
				this.transaksi = this.response.transaksi;
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
					}
				}

				if (this.transaksi.tindakan.length > 0) {
					this.initTotalHarga();
				}

				if (this.transaksi.obat_tebus.length > 0) {
					this.initObatTebus(this.transaksi.obat_tebus);
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

	initObatTebus(value): void {
		for (let obatTebus of value) {
			for (let item of obatTebus.obat_tebus_item) {
				console.log(item);
				this.listObat.push(item);
				if (this.transaksi.status == 'closed') {
					this.listOfObatTebus.push(item);
				}
			}
		}
	}

	initTotalHarga(): void {
		for (let item of this.transaksi.tindakan) {
			if (this.transaksi.no_sep === null) {
				if (item.id_pembayaran === null) {
					this.harga_total += parseInt(item.harga);
				}
			}
		}
	}

	initRawatInap(value): void {
		for (let item of value) {
			console.log(item);
			
			let one_day = 1000*60*60*24;
			let masuk: Date = new Date(item.waktu_masuk);
			let keluar: Date = new Date();

			let masuk_ms = masuk.getTime();
			let keluar_ms = keluar.getTime();

			let days = Math.round((keluar_ms - masuk_ms)/one_day);

			if (days > 0) {
				this.listOfKamarRawatInap.push(item);
				if (this.transaksi.no_sep === null) {
					if (item.id_pembayaran === null) {
						this.harga_total += parseInt(item.kamar_rawatinap.harga_per_hari) * this.howLong(item.waktu_masuk, item.waktu_keluar);
					}
				}
			}
		}

		if (this.transaksi.no_sep !== null) {
			let total_tambahan = 0;
			if (this.transaksi.pembayaran.length > 0) {
				for (let item of this.transaksi.pembayaran) {
					if (item.pembayaran_tambahan == 1) {
						total_tambahan += item.harga_bayar;
					}
				}
			}

			this.route.params
				.switchMap((params: Params) => this.transaksiService.getStatusBpjs(+params['id']))
				.subscribe(data => {
					let response = data;
					let status_bpjs = data.status_bpjs;
					if (status_bpjs.grouper.response !== null) {
						this.harga_tambahan = status_bpjs.grouper.response.add_payment_amt;
						if (this.harga_tambahan > 0) {
							if (this.harga_tambahan > total_tambahan) {
								this.harga_tambahan -= total_tambahan;
								this.harga_total += this.harga_tambahan;
								this.perlu_bayar_tambahan = true;
							}
							else {
								this.harga_tambahan = 0;
							}
						}
						console.log(this.harga_total);
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

	updateCheckedKamarRawatInap(value): void {
		let html = <HTMLInputElement>document.getElementById('kamarRawatInap' + value.id);
		let harga = parseInt(value.kamar_rawatinap.harga_per_hari) * this.howLong(value.waktu_masuk, value.waktu_keluar);
		if (html.checked == true) {
			this.listOfKamarRawatInapId.push(value.id);
			this.printListOfKamarRawatInap.push(value);
			this.total_bayar = this.total_bayar + harga;
		}
		else if (html.checked == false) {
			let index1 = this.listOfKamarRawatInapId.indexOf(value.id);
			let index2 = this.printListOfKamarRawatInap.indexOf(value);
			this.listOfKamarRawatInapId.splice(index1, 1);
			this.printListOfKamarRawatInap.splice(index2, 1);
			this.total_bayar = this.total_bayar - harga;
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

	howLong(tanggal1: string, tanggal2: string = null): number {
		let one_day = 1000*60*60*24;
		let masuk: Date = new Date(tanggal1);
		let keluar: Date;
		if (tanggal2 === null) {
			keluar = new Date();
		}
		else {
			keluar = new Date(tanggal2);
		}

		let masuk_ms = masuk.getTime();
		let keluar_ms = keluar.getTime();

		let days = Math.round((keluar_ms - masuk_ms)/one_day);

		if (days <= 0) {
			days = 1;
		}
		return days;
	}

	close(): void {
		let tutup = true;
		let bayar = false;
		let total_harga = 0;
		let listOfTindakanId: any[] = [];
		let listOfKamarRawatInapId: any[] = [];
		let listOfObatId: any[] = [];
		for (let i of this.transaksi.tindakan) {
			if (i.id_pembayaran === null) {
				if (this.transaksi.no_sep !== null) {
					listOfTindakanId.push(i.id);
					bayar = true;
					total_harga += parseInt(i.harga);
				}
				else {
					tutup = false;
				}
			}
		}

		for (let i of this.listObat) {
			if (i.id_pembayaran === null) {
				if (this.transaksi.no_sep !== null && i.jenis_obat.dicover_bpjs === true) {
					listOfObatId.push(i.id);
					bayar = true;
					total_harga += parseInt(i.jumlah) * parseInt(i.harga_jual_realisasi);
				}
				else {
					tutup = false;
				}
			}
		}

		for (let i of this.listOfKamarRawatInap) {
			if (i.id_pembayaran === null) {
				if (this.transaksi.no_sep !== null) {
					listOfKamarRawatInapId.push(i.id);
					bayar = true;
					total_harga += parseInt(i.kamar_rawatinap.harga_per_hari) * this.howLong(i.waktu_masuk, i.waktu_keluar);
				}
				else {
					tutup = false;
				}
			}
		}

		if (this.perlu_bayar_tambahan) {
			tutup = false;
		}

		if (tutup) {

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

			if (bayar) {
				this.createPembayaran(total_harga, 'bpjs', false, listOfTindakanId, listOfObatId, null, listOfKamarRawatInapId);
			}
			else {
				setTimeout(() => this.ngOnInit(), 1000);	
			}
		}
		else {
			alert("Masih ada komponen yang belum dibayar");
		}
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
				this.createPembayaran(this.total_bayar - this.harga_tambahan, metode.toLowerCase(), false, this.listOfTindakan, null, null, this.listOfKamarRawatInapId);
			}
			else {
				this.createPembayaran(this.total_bayar, metode.toLowerCase(), false, this.listOfTindakan, null, null, this.listOfKamarRawatInapId);
			}
		}
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
		let response: any = null;
		this.pembayaranService.createPembayaran(request)
		.subscribe(data => {
			console.log(data);
			this.no_pembayaran = data.pembayaran.no_pembayaran;
			console.log(this.no_pembayaran);
			setTimeout(() => this.print(), 1000);
			setTimeout(() => this.ngOnInit(), 1000);
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
