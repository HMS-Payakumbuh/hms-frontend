import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';
import { Rawatinap }			from './rawatinap';
import { RawatinapService }		from './rawatinap.service';
import { Tempattidur }          from './tempattidur';
import { TempattidurService }		from './tempattidur.service';

@Component({
 	selector: 'rawatinap-detail-page',
 	templateUrl: './rawatinap-detail.component.html',
 	providers: [
         RawatinapService,
         TempattidurService,
         TransaksiService
    ]
})

export class RawatinapDetailComponent implements OnInit {
	rawatinap: Rawatinap;
    allTempatTidur: Tempattidur[];
    transaksi: Transaksi;
	selectedTempatTidur: number;

	constructor(
		private transaksiService: TransaksiService,
		private rawatinapService: RawatinapService,
		private tempattidurService: TempattidurService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.rawatinapService.getRawatinapByNoKamar(params['noKamar']))
			.subscribe(rawatinap => this.rawatinap = rawatinap);

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['idTransaksi']))
			.subscribe(transaksi => this.transaksi = transaksi);

		this.tempattidurService.getTempattidurByNoKamar('Anggrek-001')
			.then(allTempatTidur => this.allTempatTidur = allTempatTidur);
	}

	selectTempatTidur(noTempatTidur:number) : void {
		this.selectedTempatTidur = noTempatTidur;
	}

	goBack(): void {
		this.location.back();
	}

    
}