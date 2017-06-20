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
	allTransaksi: Transaksi[];
	statuses = ['', 'open', 'closed'];
	allJenis = ['', 'umum'];

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
			.then(allAsuransi => this.initJenisList(allAsuransi));

		this.transaksiService.getAllTransaksi()
			.then(allTransaksi => this.allTransaksi = allTransaksi);
	}

	onClickDatePicker(): void {
		
	}
}