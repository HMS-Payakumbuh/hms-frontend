import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { ObatTebus }			from './obat-tebus';
import { ObatTebusService }		from './obat-tebus.service';

@Component({
 	selector: 'detail-obat-tebus-page',
 	templateUrl: './detail-obat-tebus.component.html',
 	providers: [ObatTebusService]
})

export class DetailObatTebusComponent {
	public obatTebus: ObatTebus;

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

	constructor(
		private obatTebusService: ObatTebusService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.obatTebusService.getObatTebus(+params['id']))
			.subscribe(obatTebus => this.obatTebus = obatTebus);
	}

	goBack(): void {
		this.location.back();
	}
}