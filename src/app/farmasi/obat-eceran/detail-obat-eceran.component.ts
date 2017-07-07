import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { ObatEceran }			from './obat-eceran';
import { ObatEceranService }		from './obat-eceran.service';

@Component({
 	selector: 'detail-obat-eceran-page',
 	templateUrl: './detail-obat-eceran.component.html',
 	providers: [ObatEceranService]
})

export class DetailObatEceranComponent {
	public obatEceran: ObatEceran;

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

	constructor(
		private obatEceranService: ObatEceranService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.obatEceranService.getObatEceran(+params['id']))
			.subscribe(obatEceran => this.obatEceran = obatEceran);
	}

	goBack(): void {
		this.location.back();
	}
}