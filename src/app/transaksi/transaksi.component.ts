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
	response: any;
	allTransaksi: any[];
	allJenis = ['', 'tunai'];
	config = {
		"format": "YYYY-MM-DD",
		"type": "'daytime'"
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
		this.asuransiService.getAllAsuransi()
			.subscribe(allAsuransi => this.initJenisList(allAsuransi.allAsuransi));

		this.transaksiService.getAllTransaksi()
			.subscribe(data => {
				this.response = data;
				this.allTransaksi = this.response.allTransaksi;
				console.log(this.allTransaksi);
			});
	}
}
