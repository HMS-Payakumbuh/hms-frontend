import { Component, OnInit }															from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';

import { Laboratorium }						from './laboratorium';
import { LaboratoriumService }		from './laboratorium.service';

import { Tindakan }             from './tindakan';
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
	keteranganTindakan: string[] = [];

	inputFormatter = (value : any) => value.nama;
	resultFormatter = (value : any) => value.kode + ' - ' + value.nama;

	searchTindakan = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allTindakanReference.filter(tindakanReference => tindakanReference.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private formBuilder: FormBuilder,
		private transaksiService: TransaksiService,
		private laboratoriumService: LaboratoriumService,
		private tindakanService: TindakanService,
		private config: NgbTypeaheadConfig
	) {
		config.editable = false;
	}

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.laboratoriumService.getLaboratorium(params['namaLaboratorium']))
			.subscribe(laboratorium => this.laboratorium = laboratorium);

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['idTransaksi']))
			.subscribe(transaksi => this.transaksi = transaksi);

    this.tindakanService.getAllTindakanReference().subscribe(
      data => { this.allTindakanReference = data }
    );
	}

	addSelectedTindakan(tindakan: TindakanReference) {
		this.selectedTindakan.push(tindakan);
	}

	removeSelectedTindakan(i: number) {
		this.keteranganTindakan.splice(i, 1);
		this.selectedTindakan.splice(i, 1);
	}

	goBack(): void {
		this.location.back();
	}

	save() {
		this.tindakanService.saveTindakan(this.transaksi.id, this.laboratorium.nama, false, null, this.selectedTindakan, this.keteranganTindakan);
	}
}
