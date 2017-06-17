import { Component, OnInit }															from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';
import { PoliklinikService }		from './poliklinik.service';

@Component({
 	selector: 'poliklinik-detail-page',
 	templateUrl: './poliklinik-detail.component.html',
 	providers: [
 		PoliklinikService,
 		TransaksiService
	]
})

export class PoliklinikDetailComponent implements OnInit {
	addForm: FormGroup;
	transaksi: Transaksi;
	poliklinik: Poliklinik;

	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private transaksiService: TransaksiService,
		private poliklinikService: PoliklinikService
	) {}
	
	ngOnInit() {
		this.addForm = this.formBuilder.group({
			resepEntry: this.formBuilder.array([this.initResepEntry()])
		});

		this.route.params
			.switchMap((params: Params) => this.poliklinikService.getPoliklinik(+params['namaPoliklinik']))
			.subscribe(poliklinik => this.poliklinik = poliklinik);

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['idTransaksi']))
			.subscribe(transaksi => this.transaksi = transaksi);
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