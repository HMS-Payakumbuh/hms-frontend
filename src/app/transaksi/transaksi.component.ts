import { Component }				from '@angular/core';

import { Transaksi }			from './transaksi';
import { TransaksiService }		from './transaksi.service';

@Component({
 	selector: 'transaksi-page',
 	templateUrl: './transaksi.component.html',
 	providers: [TransaksiService]
})

export class TransaksiComponent {
	allTransaksi: Transaksi[];
	statuses = ['', 'open', 'closed'];

	constructor(
		private transaksiService: TransaksiService
	) {}

	ngOnInit(): void {
		this.transaksiService.getAllTransaksi()
			.then(allTransaksi => this.allTransaksi = allTransaksi);
	}

	onClickDatePicker(): void {
		
	}
}