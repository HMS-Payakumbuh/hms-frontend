import { Component }				from '@angular/core';
import * as _ from "lodash";

import { Pembayaran }				from './pembayaran';
import { PembayaranService }		from './pembayaran.service';
import { Asuransi }				from '../pasien/asuransi';
import { AsuransiService }		from '../pasien/asuransi.service';

@Component({
 	selector: 'pembayaran-page',
 	templateUrl: './pembayaran.component.html',
 	providers: [PembayaranService, AsuransiService]
})

export class PembayaranComponent {
	response: any;
	allPembayaran: any[];
	allAsuransi = ['', 'tunai'];
	config = {
		"format": "YYYY-MM-DD"
	};

	public rowsOnPage = 10;
    public sortBy = "tanggal";
    public sortOrder = "desc";

	constructor(
		private pembayaranService: PembayaranService,
		private asuransiService: AsuransiService
	) {}

	private initAsuransiList(items: Asuransi[]): void {
		for (let item of _.uniqBy(items, 'nama_asuransi')) {
			this.allAsuransi.push(item.nama_asuransi);
		}
	}

	ngOnInit(): void {
		this.asuransiService.getAllAsuransi()
			.subscribe(allAsuransi => this.initAsuransiList(allAsuransi));

		this.pembayaranService.getAllPembayaran()
			.subscribe(data => {
				this.response = data;
				this.allPembayaran = this.response.allPembayaran;
				console.log(this.allPembayaran);
			});
	}
}