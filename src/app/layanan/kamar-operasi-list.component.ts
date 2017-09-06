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
	kamarOperasiModalNama : string;

	public selectedDate;
	public param;
	public config;
	
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

	 
	editKamarOperasi(no_kamar: string, kamarOperasi: KamarOperasi) {
		this.kamarOperasiModalNama = no_kamar;
		this.kamarOperasiModal = Object.assign({}, kamarOperasi);
	}

	updateKamarOperasi() {
		this.kamarOperasiService.updateKamarOperasi(this.kamarOperasiModalNama, this.kamarOperasiModal).subscribe(
			data => { this.ngOnInit() }
		);
	}

    createKamarOperasi(noKamar: string) {
    	this.kamarOperasiService.createKamarOperasi(this.kamarOperasiModal).subscribe(
      		data => { this.ngOnInit() }
    	);
  	}
	
	destroyKamarOperasi(no_kamar: string) {
		this.kamarOperasiService.destroyKamarOperasi(no_kamar).subscribe(
			data => { this.ngOnInit() }
    	);
 	}
}