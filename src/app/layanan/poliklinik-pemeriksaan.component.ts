import { Component, OnInit }															from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';

import { Poliklinik }						from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';

import { Diagnosis }            from './diagnosis';
import { DiagnosisReference }		from './diagnosis-reference';
import { DiagnosisService }			from './diagnosis.service';

import { Tindakan }							from './tindakan';
import { TindakanReference }		from './tindakan-reference';
import { TindakanService }			from './tindakan.service';

@Component({
 	selector: 'poliklinik-pemeriksaan-page',
 	templateUrl: './poliklinik-pemeriksaan.component.html',
 	providers: [
 		PoliklinikService,
 		TransaksiService,
 		DiagnosisService,
 		TindakanService,
 		NgbTypeaheadConfig
	]
})

export class PoliklinikPemeriksaanComponent implements OnInit {

	addForm: FormGroup;
	transaksi: any = null;
	poliklinik: Poliklinik;

	allDiagnosisReference: DiagnosisReference[];
	allTindakanReference: TindakanReference[];

	selectedDiagnosis: Diagnosis[] = [];
  selectedDiagnosisReference: DiagnosisReference[] = [];

	selectedTindakan: Tindakan[] = [];
  selectedTindakanReference: TindakanReference[] = [];

	inputFormatter = (value : any) => value.nama;
	resultFormatter = (value : any) => value.kode + ' - ' + value.nama;

	searchTindakan = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allTindakanReference.filter(tindakanReference => tindakanReference.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

	searchDiagnosis = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allDiagnosisReference.filter(diagnosisReference => diagnosisReference.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private formBuilder: FormBuilder,
		private transaksiService: TransaksiService,
		private poliklinikService: PoliklinikService,
		private diagnosisService: DiagnosisService,
		private tindakanService: TindakanService,
		private config: NgbTypeaheadConfig
	) {
		config.editable = false;
	}

	ngOnInit() {
		this.addForm = this.formBuilder.group({
			resepEntry: this.formBuilder.array([this.initResepEntry()])
		});

		this.route.params
			.switchMap((params: Params) => this.poliklinikService.getPoliklinik(params['namaPoliklinik']))
			.subscribe(poliklinik => this.poliklinik = poliklinik);

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(params['idTransaksi']))
			.subscribe(transaksi => this.transaksi = transaksi);

		this.tindakanService.getAllTindakanReference().subscribe(
      data => { this.allTindakanReference = data }
    );

		this.diagnosisService.getAllDiagnosisReference().subscribe(
      data => { this.allDiagnosisReference = data }
    )
	}

	addSelectedDiagnosis(diagnosisReference: DiagnosisReference) {
		this.selectedDiagnosisReference.push(diagnosisReference);

    let temp = new Diagnosis();
    temp.id_pasien = this.transaksi.transaksi.id_pasien;
    temp.tanggal_waktu = '2017-07-06 10:00:00';
    temp.kode_diagnosis = diagnosisReference.kode;
    this.selectedDiagnosis.push(temp);
	}

	removeSelectedDiagnosis(i: number) {
		this.selectedDiagnosis.splice(i, 1);
    this.selectedDiagnosisReference.splice(i, 1);
	}

	addSelectedTindakan(tindakanReference: TindakanReference) {
    this.selectedTindakanReference.push(tindakanReference);

    let temp = new Tindakan();
    temp.id_transaksi = this.transaksi.transaksi.id;
    temp.no_tindakan = this.selectedTindakan.length + 1;
    temp.harga = tindakanReference.harga;
    temp.dokumen_penunjang = null;
    temp.keterangan = '';
    temp.id_pembayaran = null;
    temp.kode_tindakan = tindakanReference.kode;
    temp.id_pasien = this.transaksi.transaksi.id_pasien;
    temp.tanggal_waktu = '2017-07-06 10:00:00';
    temp.np_tenaga_medis = '101';
    temp.nama_poli = this.poliklinik.nama;
    temp.nama_lab = null;
    temp.nama_ambulans = null;
    this.selectedTindakan.push(temp);
	}

	removeSelectedTindakan(i: number) {
		this.selectedTindakan.splice(i, 1);
    this.selectedTindakanReference.splice(i, 1);
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
		this.tindakanService.saveTindakan(this.transaksi.transaksi.tindakan.length, this.selectedTindakan).subscribe(
      data => { console.log(data) }
    );
    this.diagnosisService.saveDiagnosis(this.selectedDiagnosis).subscribe(
      data => { console.log(data) }
    );
	}
}
