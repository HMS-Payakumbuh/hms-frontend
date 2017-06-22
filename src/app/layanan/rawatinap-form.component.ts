import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, ChangeDetectorRef }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { Rawatinap }			from './rawatinap';
import { RawatinapService }		from './rawatinap.service';
import { Tempattidur }          from './tempattidur';
import { TempattidurService }   from './tempattidur.service';


@Component({
  selector: 'rawatinap-form-page',
  templateUrl: './rawatinap-form.component.html',
  providers: [
         RawatinapService,
         TempattidurService
    ]
})

export class RawatinapFormComponent {	
    rawatinap: Rawatinap;
	selectedTempatTidur: number;
	noKamar: string;

	constructor(
		private rawatinapService: RawatinapService,
		private tempattidurService: TempattidurService,
		private route: ActivatedRoute,
		private location: Location,
        private changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {		
        this.tempattidurService.getSelectedTempattidur()
			.then(selectedTempatTidur => this.selectedTempatTidur = selectedTempatTidur);
		
		this.route.params
			.switchMap((params: Params) => this.rawatinapService.getRawatinapByNoKamar(params['noKamar']))
			.subscribe(rawatinap => this.rawatinap = rawatinap);

		this.route.params
			.subscribe(params => { 
				this.noKamar = params['noKamar'];
			});
	}
}