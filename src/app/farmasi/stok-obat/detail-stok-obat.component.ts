import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { StokObat }			from './stok-obat';
import { StokObatService }		from './stok-obat.service';

@Component({
 	selector: 'detail-stok-obat-page',
 	templateUrl: './detail-stok-obat.component.html',
 	providers: [StokObatService]
})

export class DetailStokObatComponent {
	stokObat: StokObat;

	constructor(
		private stokObatService: StokObatService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.stokObatService.getStokObat(+params['id']))
			.subscribe(stokObat => this.stokObat = stokObat);
	}

	goBack(): void {
		this.location.back();
	}
}