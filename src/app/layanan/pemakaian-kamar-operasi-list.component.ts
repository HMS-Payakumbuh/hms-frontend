import { Component, OnInit }		from '@angular/core';
import * as _ from "lodash";

import { PemakaianKamarOperasi } 				from './pemakaian-kamar-operasi';
import { PemakaianKamarOperasiService }		    from './pemakaian-kamar-operasi.service';

@Component({
 	selector: 'pemakaian-kamar-operasi-list-page',
 	templateUrl: './pemakaian-kamar-operasi-list.component.html',
 	providers: [PemakaianKamarOperasiService]
})

export class PemakaianKamarOperasiListComponent implements OnInit {
	allPemakaianKamarOperasi: PemakaianKamarOperasi[];
	allJenis = ['', 'Rawat Inap', 'ICU'];
	allKelas = ['', 'VIP', '1', '2', '3'];
	
	constructor(
		private pemakaianKamarOperasiService: PemakaianKamarOperasiService
	) {}
	
	ngOnInit() {
		this.pemakaianKamarOperasiService.getAllPemakaianKamarOperasi()
			.then(allPemakaianKamarOperasi => this.allPemakaianKamarOperasi = allPemakaianKamarOperasi);
	}
}