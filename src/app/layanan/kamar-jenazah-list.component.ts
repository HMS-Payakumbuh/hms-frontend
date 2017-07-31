import { Component, OnInit }		from '@angular/core';
import * as _ from "lodash";

import { KamarJenazah } 				from './kamar-jenazah';
import { KamarJenazahService }		    from './kamar-jenazah.service';

@Component({
 	selector: 'kamar-jenazah-list-page',
 	templateUrl: './kamar-jenazah-list.component.html',
 	providers: [KamarJenazahService]
})

export class KamarJenazahListComponent implements OnInit {
	allKamarJenazah: KamarJenazah[];

    kamarJenazahModal : KamarJenazah = null;
	kamarJenazahModalNama : string;

	constructor(
		private kamarJenazahService: KamarJenazahService
	) {}
	
	ngOnInit() {
		this.kamarJenazahService.getAllKamarJenazah().subscribe(
			data =>  { this.allKamarJenazah = data }
		);
	}

	newKamarJenazah() {
    	this.kamarJenazahModal = new KamarJenazah();
 	}

	 
	editKamarJenazah(no_kamar: string, kamarJenazah: KamarJenazah) {
		this.kamarJenazahModalNama = no_kamar;
		this.kamarJenazahModal = Object.assign({}, kamarJenazah);
	}

	updateKamarJenazah() {
		this.kamarJenazahService.updateKamarJenazah(this.kamarJenazahModalNama, this.kamarJenazahModal).subscribe(
			data => { this.ngOnInit() }
		);
	}

    createKamarJenazah(noKamar: string) {
    	this.kamarJenazahService.createKamarJenazah(this.kamarJenazahModal).subscribe(
      		data => { this.ngOnInit() }
    	);
  	}

	destroyKamarJenazah(no_kamar: string) {
		this.kamarJenazahService.destroyKamarJenazah(no_kamar).subscribe(
			data => { this.ngOnInit() }
    	);
 	}
}