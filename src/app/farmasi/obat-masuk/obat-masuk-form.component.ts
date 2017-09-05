import { Component } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { ObatMasuk }			from './obat-masuk';
import { ObatMasukService }		from './obat-masuk.service';

import { JenisObat }			from '../jenis-obat/jenis-obat';
import { JenisObatService }			from '../jenis-obat/jenis-obat.service';

@Component({
  selector: 'obat-masuk-form-page',
  templateUrl: './obat-masuk-form.component.html',
  providers: [ObatMasukService, JenisObatService]
})

export class ObatMasukFormComponent {
	obatMasuk: ObatMasuk;
	jenisObat: JenisObat;

	allJenisObat: JenisObat[];

	inputFormatter = (value : JenisObat) => value.merek_obat;

	searchJenisObat = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allJenisObat.filter(jenisObat => jenisObat.merek_obat.toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private obatMasukService: ObatMasukService,
		private jenisObatService: JenisObatService,
		private location: Location,
    	private toastyService: ToastyService,
    	private toastyConfig: ToastyConfig
	) {}

	ngOnInit(): void {
		this.obatMasuk = new ObatMasuk();
		this.jenisObat = new JenisObat();
		this.jenisObatService.getAllJenisObat().subscribe(
      		data => { this.allJenisObat = data }
    	)
	}

	save() {
		this.obatMasuk.id_jenis_obat = this.jenisObat.id;

		if (this.validateInput()) {
			this.obatMasukService.createObatMasuk(this.obatMasuk).subscribe(
		       	data => {
		       		let toastOptions: ToastOptions = {
			            title: "Success",
			            msg: "Obat masuk berhasil ditambahkan",
			            showClose: true,
			            timeout: 5000,
			            theme: 'material'
			        };		        
			        this.toastyService.success(toastOptions);
		         	this.location.back();
		         	return true;
		       	},
		       	error => {
			        this.handleError(error);
			        return Observable.throw(error);
		       	}
	    	);
    	} else {
			return false;
	    }
	}

	addSelectedJenisObat(jenisObat: JenisObat) {
	    this.jenisObat = jenisObat;
	}

	private validateInput(): boolean {
		let today = new Date();	
		let kadaluarsa = new Date(this.obatMasuk.kadaluarsa);

		if	(this.obatMasuk.id_jenis_obat == null) {
			this.handleError("Merek obat wajib diisi");
			return false;
		} else if (this.obatMasuk.nomor_batch == '') { // Apakah nomor batch pasti ada?
			this.handleError("Nomor batch wajib diisi");
			return false;
		} else if (this.obatMasuk.jumlah == null) {
			this.handleError("Jumlah wajib diisi");
			return false;
		} else if (this.obatMasuk.jumlah <= 0) {
			this.handleError("Jumlah tidak boleh kurang dari 1");
			return false;
		} else if (this.obatMasuk.kadaluarsa == null) {
			this.handleError("Kadaluarsa wajib diisi");
			return false;
		} else if (kadaluarsa.getTime() <= today.getTime()) {
			this.handleError("Kadaluarsa tidak boleh hari ini atau lebih dahulu");
			return false;
		} else if (this.obatMasuk.harga_beli_satuan <= 0) {
			this.handleError("Harga beli satuan wajib diisi");
			return false;
		} else {			
			return true;
		}
	}

	private handleError(error: any) {
		let toastOptions: ToastOptions = {
	        title: "Error",
	        msg: error,
	        showClose: true,
	        timeout: 5000,
	        theme: 'material'
	    };
    	this.toastyService.error(toastOptions);
	}
}
