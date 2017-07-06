import { Component, OnInit }		from '@angular/core';
import * as _ from "lodash";

import { KamarOperasi } 				from './kamar-operasi';
import { KamarOperasiService }		    from './kamar-operasi.service';

@Component({
 	selector: 'kamar-operasi-list-page',
 	templateUrl: './kamar-operasi-list.component.html',
 	providers: [KamarOperasiService]
})

export class KamarOperasiListComponent implements OnInit {
	allKamarOperasi: KamarOperasi[];

    kamarOperasiModal : KamarOperasi = null;

	constructor(
		private kamarOperasiService: KamarOperasiService
	) {}
	
	ngOnInit() {
		this.kamarOperasiService.getAllKamarOperasi().subscribe(
			data =>  { this.allKamarOperasi = data }
		);
	}

	newKamarOperasi() {
    	this.kamarOperasiModal = new KamarOperasi();
 	}

    createKamarOperasi(noKamar: string) {
    	this.kamarOperasiService.createKamarOperasi(this.kamarOperasiModal).subscribe(
      		data => { window.location.reload() }
    	);
  	}
}