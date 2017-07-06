import { Component } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

import { ObatPindah }	from './obat-pindah';
import { ObatPindahService }		from './obat-pindah.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

import { StokObat }	from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

import { ObatMasuk }	from '../obat-masuk/obat-masuk';
import { ObatMasukService }		from '../obat-masuk/obat-masuk.service';

@Component({
  selector: 'obat-pindah-form-page',
  templateUrl: './obat-pindah-form.component.html',
  providers: [ObatPindahService, LokasiObatService, StokObatService, ObatMasukService]
})

export class ObatPindahFormComponent {
	public allLokasiObat: LokasiObat[];

	public obatPindah: ObatPindah;
	public obatMasuk: ObatMasuk;
	public stokObat: StokObat;
	public kode: string;
	public tempKadaluarsa: Date;
	public formattedKadaluarsa: string;

	constructor(
		private obatPindahService: ObatPindahService,
		private lokasiObatService: LokasiObatService,
		private stokObatService: StokObatService,
		private obatMasukService: ObatMasukService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.lokasiObatService.getAllLokasiObat().subscribe(
			data => { this.allLokasiObat = data }
		);
		this.obatPindah = new ObatPindah();		
		this.obatMasuk = new ObatMasuk();		
		this.stokObat = new StokObat();
		
	}

	private save() {
		this.obatPindah.id_jenis_obat = this.stokObat.jenis_obat.id;
		this.obatPindah.id_obat_masuk = this.obatMasuk.id;

		// alert(JSON.stringify(this.obatPindah)); 
		this.obatPindahService.createObatPindah(this.obatPindah).subscribe(
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