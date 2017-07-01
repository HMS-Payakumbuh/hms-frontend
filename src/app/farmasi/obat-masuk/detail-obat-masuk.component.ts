import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { ObatMasuk }			from './obat-masuk';
import { ObatMasukService }		from './obat-masuk.service';

@Component({
 	selector: 'detail-obat-masuk-page',
 	templateUrl: './detail-obat-masuk.component.html',
 	providers: [ObatMasukService]
})

export class DetailObatMasukComponent {
	obatMasuk: ObatMasuk;

	constructor(
		private obatMasukService: ObatMasukService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.obatMasukService.getObatMasuk(+params['id']))
			.subscribe(obatMasuk => this.obatMasuk = obatMasuk);
	}

	goBack(): void {
		this.location.back();
	}
}