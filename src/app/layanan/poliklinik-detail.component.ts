import { Component, OnInit }															from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';
import { Poliklinik }						from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';
import { TindakanReference }		from './tindakan-reference';
import { TindakanService }			from './tindakan.service';

@Component({
 	selector: 'poliklinik-detail-page',
 	templateUrl: './poliklinik-detail.component.html',
 	providers: [
 		PoliklinikService,
 		TransaksiService,
 		TindakanService
	]
})

export class PoliklinikDetailComponent implements OnInit {
	addForm: FormGroup;
	transaksi: Transaksi;
	poliklinik: Poliklinik;
	allTindakanReference: TindakanReference[];

	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private transaksiService: TransaksiService,
		private poliklinikService: PoliklinikService,
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
}