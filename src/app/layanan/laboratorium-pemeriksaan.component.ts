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
	transaksi: any = null;
	laboratorium: Laboratorium;

	allTindakanReference: TindakanReference[];
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
    temp.nama_poli = null;
    temp.nama_lab = this.laboratorium.nama;
    temp.nama_ambulans = null;
    this.selectedTindakan.push(temp);
	}

	removeSelectedTindakan(i: number) {
    this.selectedTindakan.splice(i, 1);
		this.selectedTindakanReference.splice(i, 1);
	}

	goBack(): void {
		this.location.back();
	}

  save() {
		this.tindakanService.saveTindakan(this.selectedTindakan).subscribe(
      data => { }
    );
	}
}
