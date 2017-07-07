import { Component } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

import { ObatRusak }	from './obat-rusak';
import { ObatRusakService }		from './obat-rusak.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

import { StokObat }	from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

import { ObatMasuk }	from '../obat-masuk/obat-masuk';
import { ObatMasukService }		from '../obat-masuk/obat-masuk.service';

@Component({
  selector: 'obat-rusak-form-page',
  templateUrl: './obat-rusak-form.component.html',
  providers: [ObatRusakService, LokasiObatService, StokObatService, ObatMasukService]
})

export class ObatRusakFormComponent {
	public allLokasiObat: LokasiObat[];

	public obatRusak: ObatRusak;
	public obatMasuk: ObatMasuk;
	public stokObat: StokObat;
	public kode: string;
	public tempKadaluarsa: Date;
	public formattedKadaluarsa: string;

	constructor(
		private obatRusakService: ObatRusakService,
		private lokasiObatService: LokasiObatService,
		private stokObatService: StokObatService,
		private obatMasukService: ObatMasukService,
		private location: Location
	) {}

	ngOnInit(): void {		
		this.lokasiObatService.getAllLokasiObat().subscribe(
			data => { this.allLokasiObat = data }
		);
		this.obatRusak = new ObatRusak();		
		this.obatMasuk = new ObatMasuk();		
		this.stokObat = new StokObat();
		this.kode = '';
	}

	private save() {
		this.obatRusak.id_jenis_obat = this.stokObat.jenis_obat.id;
		this.obatRusak.id_obat_masuk = this.obatMasuk.id;

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

	private searchObat(kode: string, lokasi: number) {
		this.obatMasukService.searchObatMasuk(kode).subscribe(
			data1 => { 
				this.obatMasuk = data1;
				this.tempKadaluarsa = new Date(this.obatMasuk.kadaluarsa);
				this.formattedKadaluarsa = this.tempKadaluarsa.toISOString().split('T')[0];
				this.stokObatService.searchStokObat(this.obatMasuk.id, lokasi).subscribe(
					data2 => { this.stokObat = data2 }
				);
			}
		);
	}
}