import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { ObatRusak }			from './obat-rusak';
import { ObatRusakService }		from './obat-rusak.service';

@Component({
 	selector: 'detail-obat-rusak-page',
 	templateUrl: './detail-obat-rusak.component.html',
 	providers: [ObatRusakService]
})

export class DetailObatRusakComponent {
	obatRusak: ObatRusak;

	constructor(
		private obatRusakService: ObatRusakService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.obatRusakService.getObatRusak(+params['id']))
			.subscribe(obatRusak => this.obatRusak = obatRusak);
	}

	goBack(): void {
		this.location.back();
	}
}