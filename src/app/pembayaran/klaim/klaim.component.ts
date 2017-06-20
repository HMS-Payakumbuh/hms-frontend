import { Component }				from '@angular/core';
import * as _ from "lodash";

import { Klaim }				from './klaim';
import { KlaimService }		from './klaim.service';
import { Asuransi }				from '../../pasien/asuransi';
import { AsuransiService }		from '../../pasien/asuransi.service';

@Component({
 	selector: 'klaim-page',
 	templateUrl: './klaim.component.html',
 	providers: [KlaimService, AsuransiService]
})

export class KlaimComponent {
	allKlaim: Klaim[];
	statuses = ['', 'open', 'closed', 'processing'];
	allAsuransi = [''];

	constructor(
		private klaimService: KlaimService,
		private asuransiService: AsuransiService
	) {}

	private initAsuransiList(items: Asuransi[]): void {
		for (let item of _.uniqBy(items, 'nama_asuransi')) {
			this.allAsuransi.push(item.nama_asuransi);
		}
	}

	ngOnInit(): void {
		this.asuransiService.getAllAsuransi()
			.then(allAsuransi => this.initAsuransiList(allAsuransi));

		this.klaimService.getAllKlaim()
			.then(allKlaim => this.allKlaim = allKlaim);
	}
}