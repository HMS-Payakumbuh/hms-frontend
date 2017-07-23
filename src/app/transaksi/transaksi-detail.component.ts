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

	constructor(
		private transaksiService: TransaksiService,
		private pembayaranService: PembayaranService,
		private asuransiService: AsuransiService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.asuransi = new Asuransi(null,'',null);
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
							this.initMetodeList(listAsuransi);
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
			if (item.waktu_keluar != null) {
				console.log(item);
				this.listOfKamarRawatInap.push(item);
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
	}

	updateCheckedTindakan(value): void {
		let html = <HTMLInputElement>document.getElementById('tindakan' + value);
		if (html.checked == true) {
			this.listOfTindakan.push(value);
		}
		else if (html.checked == false) {
			let index = this.listOfTindakan.indexOf(value);
			this.listOfTindakan.splice(index, 1);
		}
		console.log(this.listOfTindakan);
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
		let html = <HTMLInputElement>document.getElementById('kamarRawatInap' + value);
		if (html.checked == true) {
			this.listOfKamarRawatInapId.push(value);
		}
		else if (html.checked == false) {
			let index = this.listOfKamarRawatInapId.indexOf(value);
			this.listOfKamarRawatInapId.splice(index, 1);
		}
		console.log(this.listOfKamarRawatInapId);
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

	howLong(tanggal: string): number {
		let date: Date = new Date(tanggal);
		let today: Date = new Date();
		let days = 1;
		if (today.getDate() != date.getDate()) {
		 	days = today.getDate() - date.getDate();
		}

		return days;
		console.log(days);
	}

	close(): void {
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

		let total_harga: number = 0;
		let listOfTindakan: number[] = [];
		let listOfObatTebusId: number[] = [];
		let listOfObatEceranId: number[] = [];
		let listOfKamarRawatInapId: number[]= [];
		for (let i of this.transaksi.tindakan) {
			if (i.id_pembayaran === null) {
				total_harga += i.harga;
				listOfTindakan.push(i.id);
			}
		}

		for (let i of this.listOfObatTebus) {
			if (i.id_pembayaran === null) {
				total_harga += i.harga_jual_realisasi * i.jumlah;
				listOfObatTebusId.push(i.id);
			}
		}

		for (let i of this.listOfObatEceran) {
			if (i.id_pembayaran === null) {
				total_harga += i.harga_jual_realisasi * i.jumlah;
				listOfObatEceranId.push(i.id);
			}
		}

		for (let i of this.listOfKamarRawatInap) {
			if (i.id_pembayaran === null) {
				total_harga += i.harga;
				listOfKamarRawatInapId.push(i.id);
			}
		}

		this.createPembayaran(total_harga, this.transaksi.asuransi_pasien, listOfTindakan, listOfObatTebusId, listOfObatEceranId, listOfKamarRawatInapId);
	}

	private createAsuransi(id: number) {
		this.asuransi.id_pasien = id;
		let asuransi:any = { asuransi: this.asuransi };
		this.asuransiService.createAsuransi(asuransi).subscribe();
	}

	bayar(metode: string = 'tunai'): void {
		let bayar: boolean = false;
		let total_harga: number = 0;

		if (this.listOfTindakan.length > 0) {
			bayar = true;
			for (let i of this.listOfTindakan) {
				for (let a of this.transaksi.tindakan) {
					if (a.id === i) {
						total_harga += a.harga;
					}
				}
			}
		}

		if (this.listOfObatTebusId.length > 0) {
			bayar = true;
			for (let i of this.listOfObatTebusId) {
				for (let a of this.listOfObatTebus) {
					if (a.id === i) {
						total_harga += a.jumlah * a.harga_jual_realisasi;
					}
				}
			}
		}

		if (this.listOfObatEceranId.length > 0) {
			bayar = true;
			for (let i of this.listOfObatEceranId) {
				for (let a of this.listOfObatEceran) {
					if (a.id === i) {
						total_harga += a.jumlah * a.harga_jual_realisasi;
					}
				}
			}
		}

		if (this.listOfKamarRawatInapId.length > 0) {
			bayar = true;
			for (let i of this.listOfKamarRawatInapId) {
				for (let a of this.listOfKamarRawatInap) {
					if (a.id === i) {
						total_harga += a.harga;
					}
				}
			}
		}

		if (metode != 'tunai') {
			this.createAsuransi(this.transaksi.id_pasien);
		}

		if (bayar) {
			this.createPembayaran(total_harga, metode.toLowerCase(), this.listOfTindakan, this.listOfObatTebusId, this.listOfObatEceranId, this.listOfKamarRawatInapId);
		}
		console.log(metode.toLowerCase());
	}

	createPembayaran(harga: number, metode: string, listOfTindakan: number[] = null, listOfObatTebusId: number[] = null, listOfObatEceranId: number[] = null, listOfKamarRawatInapId: number[] = null): void {
		let payload: any = {
			id_transaksi: this.transaksi.id,
			harga_bayar: harga,
			metode_bayar: metode,
			tindakan: listOfTindakan,
			obatTebus: listOfObatTebusId,
			obatEceran: listOfObatEceranId,
			kamarRawatInap: listOfKamarRawatInapId
		};
		let request: any = {
			pembayaran: payload
		};

		console.log(request);
		this.pembayaranService.createPembayaran(request)
		.subscribe(data => {
			console.log(data);
			this.ngOnInit();
		});
	}
}
