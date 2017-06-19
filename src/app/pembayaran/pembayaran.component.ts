import { Component }				from '@angular/core';

import { Pembayaran }				from './pembayaran';
import { PembayaranService }		from './pembayaran.service';

@Component({
 	selector: 'pembayaran-page',
 	templateUrl: './pembayaran.component.html',
 	providers: [PembayaranService]
})

export class PembayaranComponent {
	allPembayaran: Pembayaran[];
	allAsuransi = ['', 'bpjs', 'mandiri', 'prudential', 'tunai'];

	constructor(
		private pembayaranService: PembayaranService
	) {}

	ngOnInit(): void {
		this.pembayaranService.getAllPembayaran()
			.then(allPembayaran => this.allPembayaran = allPembayaran);
	}
}