import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { ObatTindakan }			from './obat-tindakan';
import { ObatTindakanService }		from './obat-tindakan.service';

@Component({
 	selector: 'detail-obat-tindakan-page',
 	templateUrl: './detail-obat-tindakan.component.html',
 	providers: [ObatTindakanService]
})

export class DetailObatTindakanComponent {
	obatTindakan: ObatTindakan;

	constructor(
		private obatTindakanService: ObatTindakanService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.obatTindakanService.getObatTindakan(+params['id']))
			.subscribe(obatTindakan => this.obatTindakan = obatTindakan);
	}

	goBack(): void {
		this.location.back();
	}
}