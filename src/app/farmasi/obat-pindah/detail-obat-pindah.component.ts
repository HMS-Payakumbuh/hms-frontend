import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { ObatPindah }			from './obat-pindah';
import { ObatPindahService }		from './obat-pindah.service';

@Component({
 	selector: 'detail-obat-pindah-page',
 	templateUrl: './detail-obat-pindah.component.html',
 	providers: [ObatPindahService]
})

export class DetailObatPindahComponent {
	obatPindah: ObatPindah;

	constructor(
		private obatPindahService: ObatPindahService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.obatPindahService.getObatPindah(+params['id']))
			.subscribe(obatPindah => this.obatPindah = obatPindah);
	}

	goBack(): void {
		this.location.back();
	}
}