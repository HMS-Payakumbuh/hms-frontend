import { Component, OnInit }		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';

import { Rawatinap } 				from './rawatinap';
import { RawatinapService }		    from './rawatinap.service';

@Component({
 	selector: 'pindahkamar-list-page',
 	templateUrl: './pindahkamar-list.component.html',
 	providers: [RawatinapService]
})

export class PindahKamarListComponent implements OnInit {
	allRawatinap: Rawatinap[];
	allJenis = ['', 'Rawat Inap', 'ICU'];
	allKelas = ['', 'VIP', '1', '2', '3'];
	
	constructor(
		private rawatinapService: RawatinapService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.rawatinapService.getAllRawatinap().subscribe(
     		data => { this.allRawatinap = data }
    	);
	}
}