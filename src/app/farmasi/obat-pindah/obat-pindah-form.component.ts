import { Component } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { ObatPindah }	from './obat-pindah';
import { ObatPindahService }		from './obat-pindah.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

import { StokObat }	from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

@Component({
  selector: 'obat-pindah-form-page',
  templateUrl: './obat-pindah-form.component.html',
  providers: [ObatPindahService, LokasiObatService, StokObatService]
})

export class ObatPindahFormComponent {
	public allLokasiObat: LokasiObat[];

	public obatPindah: ObatPindah;
	public stokObat: StokObat;
	public kode: string;
	public tempKadaluarsa: Date;
	public formattedKadaluarsa: string;

	public allStokObatAtLocation: StokObat[];

	inputFormatter = (value : StokObat) => value.jenis_obat.merek_obat;
	resultFormatter = (value: StokObat)	=> value.jenis_obat.merek_obat  + ' - ' + value.nomor_batch;	

	searchStokObat = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allStokObatAtLocation.filter(stokObat => stokObat.jenis_obat.merek_obat.toLowerCase().indexOf(term.toLowerCase()) > -1));


	constructor(
		private obatPindahService: ObatPindahService,
		private lokasiObatService: LokasiObatService,
		private stokObatService: StokObatService,
		private location: Location,
    	private toastyService: ToastyService,
    	private toastyConfig: ToastyConfig
	) {}

	ngOnInit(): void {
		this.lokasiObatService.getAllLokasiObat().subscribe(
			data => { this.allLokasiObat = data }
		);
		this.obatPindah = new ObatPindah();		
		this.stokObat = new StokObat();		
	}

	private onChange(asal: number) {
		this.stokObatService.getStokObatByLocation(asal).subscribe(
			data => { this.allStokObatAtLocation = data }
		);
	}

	private save() {
		this.obatPindah.id_jenis_obat = this.stokObat.jenis_obat.id;
		this.obatPindah.id_stok_obat_asal = this.stokObat.id;

		// alert(JSON.stringify(this.obatPindah)); 
		this.obatPindahService.createObatPindah(this.obatPindah).subscribe(
	       	data => {
	       		let toastOptions: ToastOptions = {
		            title: "Success",
		            msg: "Pemindahan obat berhasil ditambahkan",
		            showClose: true,
		            timeout: 5000,
		            theme: 'material'
		        };		        
		        this.toastyService.success(toastOptions);
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

	private addSelectedStokObat(stokObat: StokObat) {
	    this.stokObat = stokObat;
	    this.tempKadaluarsa = new Date(this.stokObat.kadaluarsa);
		this.formattedKadaluarsa = this.tempKadaluarsa.toISOString().split('T')[0];
	}
}