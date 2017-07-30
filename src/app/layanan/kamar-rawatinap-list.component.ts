import { Component, OnInit }		from '@angular/core';
import * as _ from "lodash";

import { Rawatinap } 				from './rawatinap';
import { RawatinapService }		    from './rawatinap.service';

@Component({
 	selector: 'kamar-rawatinap-list-page',
 	templateUrl: './kamar-rawatinap-list.component.html',
 	providers: [RawatinapService]
})

export class KamarRawatinapListComponent implements OnInit {
	allKamarRawatinap: Rawatinap[];

    kamarRawatinapModal : Rawatinap = null;
	kamarRawatinapModalNama: string;

	constructor(
		private kamarRawatinapService: RawatinapService
	) {}
	
	ngOnInit() {
		this.kamarRawatinapService.getAllRawatinapAdmin().subscribe(
			data =>  { this.allKamarRawatinap = data }
		);
	}

	newKamarRawatinap() {
    	this.kamarRawatinapModal = new Rawatinap();
 	}

	editKamarRawatinap(no_kamar: string, rawatinap: Rawatinap) {
		this.kamarRawatinapModalNama = no_kamar;
		this.kamarRawatinapModal = Object.assign({}, rawatinap);
	}

	updateKamarRawatinap() {
		this.kamarRawatinapService.updateRawatinap(this.kamarRawatinapModalNama, this.kamarRawatinapModal).subscribe(
			data => { this.ngOnInit() }
		);
	}

    createKamarRawatinap(noKamar: string) {
    	this.kamarRawatinapService.createRawatinap(this.kamarRawatinapModal).subscribe(
      		data => { this.ngOnInit() }
    	);
  	}

	destroyKamarRawatinap(no_kamar: string) {
		this.kamarRawatinapService.destroyRawatinap(no_kamar).subscribe(
			data => { this.ngOnInit() }
    	);
 	 }
}