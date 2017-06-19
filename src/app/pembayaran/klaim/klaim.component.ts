import { Component }				from '@angular/core';

import { Klaim }				from './klaim';
import { KlaimService }		from './klaim.service';

@Component({
 	selector: 'klaim-page',
 	templateUrl: './klaim.component.html',
 	providers: [KlaimService]
})

export class KlaimComponent {
	allKlaim: Klaim[];
	statuses = ['', 'open', 'closed', 'processing'];
	allAsuransi = ['', 'bpjs', 'mandiri', 'prudential'];

	constructor(
		private klaimService: KlaimService
	) {}

	ngOnInit(): void {
		this.klaimService.getAllKlaim()
			.then(allKlaim => this.allKlaim = allKlaim);
	}
}