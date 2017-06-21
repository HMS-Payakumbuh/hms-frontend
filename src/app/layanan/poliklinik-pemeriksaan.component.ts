import { Component, OnInit }															from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';

import { Poliklinik }						from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';

import { DiagnosisReference }		from './diagnosis-reference';
import { DiagnosisService }			from './diagnosis.service';

import { Tindakan }			from './tindakan';
import { TindakanReference }		from './tindakan-reference';
import { TindakanService }			from './tindakan.service';

@Component({
 	selector: 'poliklinik-pemeriksaan-page',
 	templateUrl: './poliklinik-pemeriksaan.component.html',
 	providers: [
 		PoliklinikService,
 		TransaksiService,
 		DiagnosisService,
 		TindakanService
	]
})

export class PoliklinikPemeriksaanComponent implements OnInit {

	addForm: FormGroup;
	transaksi: Transaksi;
	poliklinik: Poliklinik;

	allDiagnosisReference: DiagnosisReference[];
	allTindakanReference: TindakanReference[];

	selectedDiagnosis: DiagnosisReference[] = [];
	selectedTindakan: TindakanReference[] = [];

	diagnosisAutocompleteConfig: any = {'placeholder': 'Tuliskan kode diagnosis', 'sourceField': ['nama']};
	tindakanAutocompleteConfig: any = {'placeholder': 'Tuliskan kode tindakan', 'sourceField': ['nama']};

	constructor(
		private route: ActivatedRoute,
		private location: Location,		
		private formBuilder: FormBuilder,
		private transaksiService: TransaksiService,
		private poliklinikService: PoliklinikService,
		private diagnosisService: DiagnosisService,
		private tindakanService: TindakanService
	) {}
	
	ngOnInit() {
		this.addForm = this.formBuilder.group({
			resepEntry: this.formBuilder.array([this.initResepEntry()])
		});

		this.route.params
			.switchMap((params: Params) => this.poliklinikService.getPoliklinik(params['namaPoliklinik']))
			.subscribe(poliklinik => this.poliklinik = poliklinik);

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['idTransaksi']))
			.subscribe(transaksi => this.transaksi = transaksi);

		this.tindakanService.getAllTindakanReference()
			.then(allTindakanReference => this.allTindakanReference = allTindakanReference);

		this.diagnosisService.getAllDiagnosisReference()
			.then(allDiagnosisReference => this.allDiagnosisReference = allDiagnosisReference);
	}

	addSelectedDiagnosis(diagnosis: DiagnosisReference) {
		this.selectedDiagnosis.push(diagnosis);
	}

	removeSelectedDiagnosis(i: number) {
		this.selectedDiagnosis.splice(i, 1);
	}

	addSelectedTindakan(tindakan: TindakanReference) {
		this.selectedTindakan.push(tindakan);
	}

	removeSelectedTindakan(i: number) {
		this.selectedTindakan.splice(i, 1);
	}

	initResepEntry() {
		return this.formBuilder.group({
			obatResep: ['', Validators.required]
		});
	}

	addResepEntry() {
    const control = < FormArray > this.addForm.controls['resepEntry'];
    control.push(this.initResepEntry());
	}

	removeResepEntry(i: number) {
    const control = < FormArray > this.addForm.controls['resepEntry'];
    control.removeAt(i);
	}

	goBack(): void {
		this.location.back();
	}	

	save() {
		this.tindakanService.saveTindakan(this.transaksi.id, this.poliklinik.nama, true, null, this.selectedTindakan);
	}
}