import { Component, OnInit }		from '@angular/core';

import { Rawatinap } 				from './rawatinap';
import { RawatinapService }		    from './rawatinap.service';

@Component({
 	selector: 'rawatinap-list-page',
 	templateUrl: './rawatinap-list.component.html',
 	providers: [RawatinapService]
})

export class RawatinapListComponent implements OnInit {
	allRawatinap: Rawatinap[];

	constructor(
		private rawatinapService: RawatinapService
	) {}
	
	ngOnInit() {
		this.rawatinapService.getAllRawatinap()
			.then(allRawatinap => this.allRawatinap = allRawatinap);
	}
}