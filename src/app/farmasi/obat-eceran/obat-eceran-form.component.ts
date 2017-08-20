import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';
import { Router }                     from '@angular/router';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { ObatEceran } from './obat-eceran';
import { ObatEceranItem } from './obat-eceran-item';
import { ObatEceranService } from './obat-eceran.service';

import { StokObat }	from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

@Component({
  selector: 'obat-eceran-form-page',
  templateUrl: './obat-eceran-form.component.html',
  providers: [StokObatService, ObatEceranService]

})

export class ObatEceranFormComponent {	
	public merek_obat: string;
	public obatEceranItems: ObatEceranItem[];

	public stokObat: StokObat;
	public obatEceran: ObatEceran;

	public allStokObatAtLocation: StokObat[];

	inputFormatter = (value : StokObat) => value.jenis_obat.merek_obat + ' - ' + value.nomor_batch;
	resultFormatter = (value: StokObat)	=> value.jenis_obat.merek_obat + ' - ' + value.nomor_batch;	

	searchStokObat = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allStokObatAtLocation.filter(stokObat => (stokObat.jenis_obat.merek_obat + ' ' + stokObat.nomor_batch).toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor (		
		private changeDetectorRef: ChangeDetectorRef,		
		private stokObatService: StokObatService,	
		private obatEceranService: ObatEceranService,
		private location: Location,
    	private toastyService: ToastyService,
    	private toastyConfig: ToastyConfig,
    	private router: Router
	) {}

	ngOnInit(): void {				
		this.stokObat = new StokObat();		
		this.obatEceran = new ObatEceran();	
		this.obatEceranItems = [];

		this.stokObatService.getStokObatByLocationType(1).subscribe( // 1 adalah kode untuk jenis lokasi apotek
			data => { this.allStokObatAtLocation = data }
		);
	}

	addObatItem(stokObat: StokObat) {
	    let temp = new ObatEceranItem();

	    temp.jumlah = null;

		temp.id_jenis_obat = stokObat.id_jenis_obat;
    	temp.id_stok_obat = stokObat.id;
    	temp.stok_obat = stokObat;
    	temp.jenis_obat = stokObat.jenis_obat;
    	temp.harga_jual_realisasi = temp.jenis_obat.harga_jual_satuan;

    	this.obatEceranItems.push(temp);
	}

	removeObatItem(i: number) {
	    this.obatEceranItems.splice(i, 1);
	}

	private save() {
		this.obatEceran.obat_eceran_item = this.obatEceranItems;

		// alert(JSON.stringify(this.obatEceran)); 
		this.obatEceranService.createObatEceran(this.obatEceran).subscribe(
	       	data => {	         	  	
	       		let toastOptions: ToastOptions = {
		            title: "Success",
		            msg: "Obat eceran berhasil ditambahkan",
		            showClose: true,
		            timeout: 5000,
		            theme: 'material'
		        };		        
		        this.toastyService.success(toastOptions);
	     		this.router.navigateByUrl('/transaksi-eksternal/' + data.id_transaksi);
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