import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { TindakanReference }			from './tindakan-reference';
import { TindakanService }		from './tindakan.service';

@Component({
 	selector: 'tindakan-reference-form',
 	templateUrl: './tindakan-reference-form.component.html',
 	providers: [TindakanService]
})

export class TindakanReferenceFormComponent implements OnInit {
	tindakanReference: TindakanReference;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private tindakanService: TindakanService
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.tindakanService.getTindakanReference(params['kode']))
			.subscribe(tindakanReference => this.tindakanReference = tindakanReference);
	}

	goBack(): void {
		this.location.back();
	}
}