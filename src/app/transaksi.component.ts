import { Component }				from '@angular/core';

import { TransaksiService }		from './transaksi.service';
import { Transaksi }			from './transaksi';

@Component({
 	selector: 'transaksi-page',
 	templateUrl: './transaksi.component.html',
 	providers: [TransaksiService]
})

export class TransaksiComponent {
	allTransaksi: Transaksi[] = [
			{id: 1, id_pasien: 1, no_sep: '01312304', nama_pasien: 'Jonathan', harga: 1000000, tanggal: '21-02-1996', status: 'open', tindakan: [{nama: 'operasi', harga: 500000}, {nama: 'suntik HIV', harga: 500000}], obat:[{nama: 'betadine', satuan: 'botol', harga: 500000}]},
			{id: 2, id_pasien: 3, no_sep: '01312304', nama_pasien: 'Agan', harga: 2000000, tanggal: '21-02-1996', status: 'open', tindakan: [{nama: 'operasi', harga: 500000}, {nama: 'suntik HIV', harga: 500000}], obat:[{nama: 'betadine', satuan: 'botol', harga: 500000}]},
			{id: 3, id_pasien: 2, no_sep: '01312304', nama_pasien: 'Bambang', harga: 1500000, tanggal: '21-02-1996', status: 'closed', tindakan: [{nama: 'operasi', harga: 500000}, {nama: 'suntik HIV', harga: 500000}], obat:[{nama: 'betadine', satuan: 'botol', harga: 500000}]}
	]; //Mock-up

	constructor(
		private transaksiService: TransaksiService
	) {}

	ngOnInit(): void {
		this.transaksiService.getAllTransaksi()
			.then(allTransaksi => this.allTransaksi);
	}

	onClickDatePicker() {
		$('#datetimepicker').datepicker();
	}
}