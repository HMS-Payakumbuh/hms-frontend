import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

import { ObatEceran } from './obat-eceran';
import { ObatEceranItem } from './obat-eceran-item';
import { ObatEceranService } from './obat-eceran.service';

import { ObatMasuk } from '../obat-masuk/obat-masuk';
import { ObatMasukService } from '../obat-masuk/obat-masuk.service';

import { StokObat }	from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

@Component({
  selector: 'obat-eceran-form-page',
  templateUrl: './obat-eceran-form.component.html',
  providers: [StokObatService, ObatMasukService, ObatEceranService]

})

export class ObatEceranFormComponent {	
	public kode_obat: string;
	public obatEceranItems: ObatEceranItem[];

	public obatMasuk: ObatMasuk;
	public stokObat: StokObat;
	public obatEceran: ObatEceran;

	rowData = [];

	constructor (		
		private changeDetectorRef: ChangeDetectorRef,		
		private stokObatService: StokObatService,
		private obatMasukService: ObatMasukService,		
		private obatEceranService: ObatEceranService,
		private location: Location
	) {}

	ngOnInit(): void {			
		this.obatMasuk = new ObatMasuk();		
		this.stokObat = new StokObat();		
		this.obatEceran = new ObatEceran();	
		this.obatEceranItems = [];
	}

	addObatItem(kode_obat: string) {
	    let temp = new ObatEceranItem();
	    temp.jumlah = null;
	    temp.keterangan = '';

	    this.obatMasukService.searchObatMasuk(kode_obat).subscribe(
			data1 => { 
				this.obatMasuk = data1;
				this.stokObatService.searchStokObat(this.obatMasuk.id, 2).subscribe(
					data2 => { 
						this.stokObat = data2;

						temp.id_jenis_obat = this.stokObat.id_jenis_obat;
				    	temp.id_obat_masuk = this.stokObat.id_obat_masuk;
				    	temp.harga_jual_realisasi = this.stokObat.jenis_obat.harga_jual_satuan;		    

				    	this.obatEceranItems.push(temp);
					}					
				);
			}
		);
	}

	removeObatItem(i: number) {
	    this.obatEceranItems.splice(i, 1);
	}

	private save() {
		this.obatEceran.obat_eceran_item = this.obatEceranItems;

		alert(JSON.stringify(this.obatEceran)); 
		this.obatEceranService.createObatEceran(this.obatEceran).subscribe(
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