import { Component } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

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
	resultFormatter = (value: StokObat)	=> value.jenis_obat.merek_obat  + ' - ' + value.obat_masuk.nomor_batch;	

	searchStokObat = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allStokObatAtLocation.filter(stokObat => stokObat.jenis_obat.merek_obat.toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private obatRusakService: ObatRusakService,
		private lokasiObatService: LokasiObatService,
		private stokObatService: StokObatService,
		private location: Location
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
		this.obatRusak.id_obat_masuk = this.stokObat.obat_masuk.id;
		this.obatRusak.id_stok_obat = this.stokObat.id;

		// alert(JSON.stringify(this.obatRusak)); 
		this.obatRusakService.createObatRusak(this.obatRusak).subscribe(
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

	private addSelectedStokObat(stokObat: StokObat) {
	    this.stokObat = stokObat;
	    this.tempKadaluarsa = new Date(this.stokObat.obat_masuk.kadaluarsa);
		this.formattedKadaluarsa = this.tempKadaluarsa.toISOString().split('T')[0];
	}
}