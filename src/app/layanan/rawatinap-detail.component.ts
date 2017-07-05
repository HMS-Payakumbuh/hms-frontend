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
import { PemakaianKamar }          from './pemakaian-kamar';
import { PemakaianKamarService }   from './pemakaian-kamar.service';


@Component({
 	selector: 'rawatinap-detail-page',
 	templateUrl: './rawatinap-detail.component.html',
 	providers: [
         RawatinapService,
         TempattidurService,
		 PemakaianKamarService,
         TransaksiService
    ]
})

export class RawatinapDetailComponent implements OnInit {
	rawatinap: Rawatinap;
    allTempatTidur: Tempattidur[];
    transaksi: Transaksi;
	noKamar: string;
	selectedTempatTidur: number;
	pemakaianKamarModal: PemakaianKamar = null;
    pemakaianKamarModalNama: string = null;

	constructor(
		private transaksiService: TransaksiService,
		private rawatinapService: RawatinapService,
		private tempattidurService: TempattidurService,
		private pemakaianKamarService: PemakaianKamarService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.rawatinapService.getRawatinap(params['noKamar']))
			.subscribe(rawatinap => this.rawatinap = rawatinap);

		this.route.params
			.switchMap((params: Params) => this.tempattidurService.getAllTempattidur(params['noKamar']))
			.subscribe(data => this.allTempatTidur = data);

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['idTransaksi']))
			.subscribe(transaksi => this.transaksi = transaksi);

	}

	selectTempatTidur(noTempatTidur:number) : void {
		if(noTempatTidur === this.tempattidurService.selectedTempatTidur) 
			this.tempattidurService.selectedTempatTidur = 0;
		else
			this.tempattidurService.selectedTempatTidur = noTempatTidur;
	}

	isSelected(noTempatTidur:number) {
		return(this.tempattidurService.selectedTempatTidur === noTempatTidur);
	}

	checkStatus(noTempatTidur:number) {
		return (this.allTempatTidur[noTempatTidur-1].status == 1); 
	}

	getSelectedTempatTidur() {
		this.selectedTempatTidur = this.tempattidurService.selectedTempatTidur;
		return this.selectedTempatTidur;
	}

	newPemakaianKamar() {
    	this.pemakaianKamarModal = new PemakaianKamar();
 	}

    // createPemakaianKamarRawatInap() {
    // 	this.pemakaianKamarService.(this.pemakaianKamarModal).subscribe(
    //   		data => { window.location.reload() }
    // 	);
  	// }

	goBack(): void {
		this.location.back();
	}
}