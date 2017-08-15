import { Component }				from '@angular/core';
import * as _ from "lodash";

import { Transaksi }			from './transaksi';
import { TransaksiService }		from './transaksi.service';
import { Asuransi }				from '../pasien/asuransi';
import { AsuransiService }		from '../pasien/asuransi.service';


@Component({
 	selector: 'transaksi-page',
 	templateUrl: './transaksi.component.html',
 	providers: [TransaksiService, AsuransiService]
})

export class TransaksiComponent {
	transaksi_obat: boolean;
	nama_pasien: string;
	kode_pasien: string;
	cari: boolean;
	loading: boolean;
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
		this.loading = false;
		this.transaksi_obat = false;
		this.cari = false;
		this.nama_pasien = null;
		this.kode_pasien = null;
		this.asuransiService.getAllAsuransi()
			.subscribe(allAsuransi => this.initJenisList(allAsuransi.allAsuransi));
	}

	private searchTransaksi() {
		this.loading = true;
		this.transaksiService.getAllTransaksi(null, this.nama_pasien, 'open')
			.subscribe(data => {
				this.response = data;
				this.allTransaksi = this.response.allTransaksi;
				console.log(this.allTransaksi);
				this.cari = true;
				this.loading = false;
			});
	}
}
