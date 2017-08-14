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
		// alert(JSON.stringify(this.jenisObat)); 
		this.jenisObatService.createJenisObat(this.jenisObat).subscribe(
	       	data => {
	         	this.location.back();
	         	return true;
	       	},
	       	error => {	       		
	       		let toastOptions: ToastOptions = {
		            title: "Error",
		            msg: error,
		            showClose: true,
		            timeout: 5000,
		            theme: 'material'
		        };
		        this.toastyService.error(toastOptions);
				return Observable.throw(error);
	       	}
    	);
	}

}