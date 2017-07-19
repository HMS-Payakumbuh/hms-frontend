import 'rxjs/add/operator/switchMap';
import * as _ from "lodash";
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import * as _ from "lodash";
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
	asuransi: Asuransi;
	allAsuransi: Asuransi[];
	umur: number = 0;
	listOfTindakan: number[] = [];
	allMetode = [];

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
				console.log(this.transaksi);
				this.calculateAge(this.transaksi.pasien.tanggal_lahir);

				this.asuransiService.getAsuransi(this.transaksi.pasien.id)
					.subscribe(listAsuransi => {
						this.allAsuransi = listAsuransi;
						this.initMetodeList(listAsuransi);
					});
			});
	}

	goBack(): void {
		this.location.back();
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
		for (let i of this.transaksi.tindakan) {
			if (i.id_pembayaran === null) {
				total_harga += i.harga;
				listOfTindakan.push(i.id);
			}
		}

		this.createPembayaran(total_harga, this.transaksi.asuransi_pasien, listOfTindakan);
	}

	private createAsuransi(id: number) {
		this.asuransi.id_pasien = id;
		let asuransi:any = { asuransi: this.asuransi };
		this.asuransiService.createAsuransi(asuransi).subscribe();
	}

	bayar(metode: string = 'tunai'): void {
		if (metode != 'tunai') {
			this.createAsuransi(this.transaksi.id_pasien);
		}
		if (this.listOfTindakan.length > 0) {
			let total_harga: number = 0;
			for (let i of this.listOfTindakan) {
				for (let a of this.transaksi.tindakan) {
					if (a.id === i) {
						total_harga += a.harga;
					}
				}
			}
			this.createPembayaran(total_harga, metode.toLowerCase(), this.listOfTindakan);
		}
		console.log(metode.toLowerCase());
	}

	createPembayaran(harga: number, metode: string, listOfTindakan: number[] = null): void {
		let payload: any = {
			id_transaksi: this.transaksi.id,
			harga_bayar: harga,
			metode_bayar: metode,
			tindakan: listOfTindakan
		};
		let request: any = {
			pembayaran: payload
		};

		console.log(request);
		this.pembayaranService.createPembayaran(request)
		.subscribe(data => {
			console.log(data);
		});
	}
}
