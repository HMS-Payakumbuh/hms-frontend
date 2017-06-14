import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { TransaksiService }		from './transaksi.service';
import { Transaksi }			from './transaksi';

@Component({
 	selector: 'transaksi-detail-page',
 	templateUrl: './transaksi-detail.component.html',
 	providers: [TransaksiService]
})

export class TransaksiDetailComponent implements OnInit {
	transaksi: Transaksi = {id: 1, id_pasien: 1, no_sep: '01312304', nama_pasien: 'Jonathan', harga: 1000000, tanggal:'21-02-1996', status: 'open', tindakan: [{nama: 'operasi', harga: 500000}, {nama: 'suntik HIV', harga: 500000}], obat:[{nama: 'betadine', jumlah: '1', satuan: 'botol', harga: 500000}]}; //mock-up

	constructor(
		private transaksiService: TransaksiService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['id']))
			.subscribe(transaksi => this.transaksi = transaksi);
	}
}