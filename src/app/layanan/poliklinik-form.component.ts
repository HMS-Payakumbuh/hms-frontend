import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { Poliklinik }			from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';

@Component({
 	selector: 'poliklinik-form',
 	templateUrl: './poliklinik-form.component.html',
 	providers: [PoliklinikService]
})

export class PoliklinikFormComponent implements OnInit {
	poliklinik: Poliklinik;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private poliklinikService: PoliklinikService
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.poliklinikService.getPoliklinik(decodeURIComponent(this.route.params['namaPoliklinik'])))
			.subscribe(poliklinik => this.poliklinik = poliklinik);
	}

	goBack(): void {
		this.location.back();
	}
}