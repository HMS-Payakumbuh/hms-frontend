import { Component } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { ObatRusak }	from './obat-rusak';
import { ObatRusakService }		from './obat-rusak.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

import { StokObat }	from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

@Component({
  selector: 'obat-rusak-form-page',
  templateUrl: './obat-rusak-form.component.html',
  providers: [ObatRusakService, LokasiObatService, StokObatService]
})

export class ObatRusakFormComponent {
	public allLokasiObat: LokasiObat[];

	public obatRusak: ObatRusak;
	public stokObat: StokObat;
	public kode: string;
	public tempKadaluarsa: Date;
	public formattedKadaluarsa: string;

	public allStokObatAtLocation: StokObat[];

	inputFormatter = (value : StokObat) => value.jenis_obat.merek_obat;
	resultFormatter = (value: StokObat)	=> value.jenis_obat.merek_obat + ' - ' + value.nomor_batch;	

	searchStokObat = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allStokObatAtLocation.filter(stokObat => (stokObat.jenis_obat.merek_obat + ' ' + stokObat.nomor_batch).toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private obatRusakService: ObatRusakService,
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
		this.obatRusak = new ObatRusak();			
		this.stokObat = new StokObat();
		this.kode = '';
	}

	private onChange(asal: number) {
		this.stokObatService.getStokObatByLocation(asal).subscribe(
			data => { this.allStokObatAtLocation = data }
		);
	}

	private save() {
		this.obatRusak.id_jenis_obat = this.stokObat.jenis_obat.id;
		this.obatRusak.id_stok_obat = this.stokObat.id;

		if (this.validateInput()) {
			this.obatRusakService.createObatRusak(this.obatRusak).subscribe(
		       	data => {
		       		let toastOptions: ToastOptions = {
			            title: "Success",
			            msg: "Obat rusak berhasil ditambahkan",
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

	private addSelectedStokObat(stokObat: StokObat) {
	    this.stokObat = stokObat;
	    this.tempKadaluarsa = new Date(this.stokObat.kadaluarsa);
		this.formattedKadaluarsa = this.tempKadaluarsa.toISOString().split('T')[0];
	}

	private validateInput(): boolean {
		if	(this.obatRusak.asal == null) {
			this.handleError("Lokasi asal wajib diisi");
			return false;
		} else if (this.obatRusak.alasan == '') {
			this.handleError("Alasan wajib diisi");
			return false;
		} else if (this.obatRusak.id_jenis_obat == null) {
			this.handleError("Merek obat wajib diisi");
			return false;
		} else if (this.obatRusak.jumlah == null) {
			this.handleError("Jumlah keluar wajib diisi");
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