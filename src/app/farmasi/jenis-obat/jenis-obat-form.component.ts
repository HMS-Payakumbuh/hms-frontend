import { Component } 	from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { JenisObat }	from './jenis-obat';
import { JenisObatService }		from './jenis-obat.service';

@Component({
  selector: 'jenis-obat-form-page',
  templateUrl: './jenis-obat-form.component.html',
  providers: [JenisObatService]
})

export class JenisObatFormComponent {

	jenisObat: JenisObat;

	constructor(
		private jenisObatService: JenisObatService,			
		private location: Location,
    	private toastyService: ToastyService,
    	private toastyConfig: ToastyConfig
	) {}

	ngOnInit(): void {
		this.jenisObat = new JenisObat();
	}

	private save() {
		if (this.validateInput()) {
			this.jenisObatService.createJenisObat(this.jenisObat).subscribe(
		       	data => {
		       		let toastOptions: ToastOptions = {
			            title: "Success",
			            msg: "Merek obat berhasil ditambahkan",
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

	private validateInput(): boolean {
		if	(this.jenisObat.merek_obat == '') {
			this.handleError("Merek obat wajib diisi");
			return false;
		} else if (this.jenisObat.nama_generik == '') {
			this.handleError("Nama generik wajib diisi");
			return false;
		} else if (this.jenisObat.pembuat == '') {
			this.handleError("Pembuat wajib diisi");
			return false;
		} else if (this.jenisObat.golongan == '') {
			this.handleError("Golongan wajib diisi");
			return false;
		} else if (this.jenisObat.satuan == '') {
			this.handleError("Satuan wajib diisi");
			return false;
		} else if (this.jenisObat.harga_jual_satuan <= 0) {
			this.handleError("Harga jual satuan wajib diisi");
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