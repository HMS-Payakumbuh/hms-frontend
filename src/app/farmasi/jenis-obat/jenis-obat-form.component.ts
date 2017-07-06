import { Component } 	from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

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
		private location: Location
	) {}

	ngOnInit(): void {
		this.jenisObat = new JenisObat(null, '', '', '', '', '', null, '');
	}

	private save() {
		// alert(JSON.stringify(this.jenisObat)); 
		this.jenisObatService.createJenisObat(this.jenisObat).subscribe(
	       	data => {
	         	this.location.back();
	         	return true;
	       	},
	       	error => {
		         console.error("Error saving!");
		         return Observable.throw(error);
	       	}
    	);
	}

}