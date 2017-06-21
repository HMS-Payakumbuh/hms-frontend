import { Component, OnInit }															from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';

import { Laboratorium }						from './laboratorium';
import { LaboratoriumService }		from './laboratorium.service';

import { Tindakan }			from './tindakan';
import { TindakanReference }		from './tindakan-reference';
import { TindakanService }			from './tindakan.service';

@Component({
 	selector: 'laboratorium-pemeriksaan-page',
 	templateUrl: './laboratorium-pemeriksaan.component.html',
 	providers: [
 		LaboratoriumService,
 		TransaksiService,
 		TindakanService
	]
})

export class LaboratoriumPemeriksaanComponent implements OnInit {

	addForm: FormGroup;
	transaksi: Transaksi;
	laboratorium: Laboratorium;

	allTindakanReference: TindakanReference[];
	selectedTindakan: TindakanReference[] = [];

	tindakanAutocompleteConfig: any = {'placeholder': 'Tuliskan kode tindakan', 'sourceField': ['nama']};

	constructor(
		private route: ActivatedRoute,
		private location: Location,		
		private formBuilder: FormBuilder,
		private transaksiService: TransaksiService,
		private laboratoriumService: LaboratoriumService,
		private tindakanService: TindakanService
	) {}
	
	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.laboratoriumService.getLaboratorium(params['namaLaboratorium']))
			.subscribe(laboratorium => this.laboratorium = laboratorium);

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['idTransaksi']))
			.subscribe(transaksi => this.transaksi = transaksi);

		this.tindakanService.getAllTindakanReference()
			.then(allTindakanReference => this.allTindakanReference = allTindakanReference);
	}

	addSelectedTindakan(tindakan: TindakanReference) {
		this.selectedTindakan.push(tindakan);
	}

	removeSelectedTindakan(i: number) {
		this.selectedTindakan.splice(i, 1);
	}

	goBack(): void {
		this.location.back();
	}	

	save() {
		this.tindakanService.saveTindakan(this.transaksi.id, this.laboratorium.nama, false, null, this.selectedTindakan);
	}
}