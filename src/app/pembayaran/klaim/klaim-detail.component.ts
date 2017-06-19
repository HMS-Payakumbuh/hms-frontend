import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { KlaimService }		from './klaim.service';
import { Klaim }				from './klaim';

@Component({
 	selector: 'klaim-detail-page',
 	templateUrl: './klaim-detail.component.html',
 	providers: [KlaimService]
})

export class KlaimDetailComponent implements OnInit {
	klaim: Klaim;

	constructor(
		private klaimService: KlaimService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.klaimService.getKlaim(+params['id']))
			.subscribe(klaim => this.klaim = klaim);
	}

	goBack(): void {
		this.location.back();
	}
}