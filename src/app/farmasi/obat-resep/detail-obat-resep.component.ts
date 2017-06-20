import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { ObatResep }			from './obat-resep';
import { ObatResepService }		from './obat-resep.service';

@Component({
 	selector: 'detail-obat-resep-page',
 	templateUrl: './detail-obat-resep.component.html',
 	providers: [ObatResepService]
})

export class DetailObatResepComponent {
	public obatResep: ObatResep;

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

	constructor(
		private obatResepService: ObatResepService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.obatResepService.getObatResep(+params['id']))
			.subscribe(obatResep => this.obatResep = obatResep);
	}

	goBack(): void {
		this.location.back();
	}
}