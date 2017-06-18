import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { ObatBatch }			from './obat-batch';
import { ObatBatchService }		from './obat-batch.service';

@Component({
 	selector: 'detail-obat-page',
 	templateUrl: './detail-obat.component.html',
 	providers: [ObatBatchService]
})

export class DetailObatComponent {
	obatBatch: ObatBatch;

	constructor(
		private obatBatchService: ObatBatchService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.obatBatchService.getObatBatch(+params['kode-obat']))
			.subscribe(obatBatch => this.obatBatch = obatBatch);
	}

	goBack(): void {
		this.location.back();
	}
}