import { Component }				from '@angular/core';
import * as _ from "lodash";

import { Transaksi }			from './transaksi';
import { TransaksiService }		from './transaksi.service';
import { Asuransi }				from '../pasien/asuransi';
import { AsuransiService }		from '../pasien/asuransi.service';


@Component({
 	selector: 'transaksi-obat-page',
 	templateUrl: './transaksi.component.html',
 	providers: [TransaksiService, AsuransiService]
})

export class TransaksiObatComponent {
	transaksi_obat: boolean;
	nama_pasien: string;
	kode_pasien: string;
	cari: boolean;
	response: any;
	allTransaksi: any[];
	allJenis = ['', 'tunai'];
	config = {
		"format": "YYYY-MM-DD"
	};

    public rowsOnPage = 10;
    public sortBy = "tanggal";
    public sortOrder = "desc";

	constructor(
		private transaksiService: TransaksiService,
		private asuransiService: AsuransiService
	) {}

	private initJenisList(items: Asuransi[]): void {
		for (let item of _.uniqBy(items, 'nama_asuransi')) {
			this.allJenis.push(item.nama_asuransi);
		}
	}

	ngOnInit(): void {
		this.transaksi_obat = true;
		this.cari = false;
		this.nama_pasien = null;
		this.kode_pasien = null;
		this.allTransaksi = [];
		this.asuransiService.getAllAsuransi()
			.subscribe(allAsuransi => this.initJenisList(allAsuransi.allAsuransi));
	}

	private searchTransaksi() {
		this.transaksiService.getAllTransaksi(null, this.nama_pasien, 'open')
			.subscribe(data => {
				let allTransaksi: any[] = [];
				this.response = data;
				allTransaksi = this.response.allTransaksi;
				console.log(this.allTransaksi);
				console.log(allTransaksi);
				this.cari = true;
				for (let transaksi of allTransaksi) {
					if (transaksi.obat_tebus.length > 0) {
						this.allTransaksi.push(transaksi);
					}
				}
			});
	}
}
