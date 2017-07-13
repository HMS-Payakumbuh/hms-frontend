import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';

import { ObatTebus } from './obat-tebus';
import { ObatTebusItem } from './obat-tebus-item';
import { ObatTebusService } from './obat-tebus.service';

import { StokObat }	from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

import { Pasien } from '../../pasien/pasien';
import { PasienService } from '../../pasien/pasien.service';

import { Transaksi } from '../../transaksi/transaksi';
import { TransaksiService } from '../../transaksi/transaksi.service';

import { Resep } from '../resep/resep';
import { ResepService } from '../resep/resep.service';

@Component({
  selector: 'obat-tebus-form-page',
  templateUrl: './obat-tebus-form.component.html',
  providers: [ObatTebusService, PasienService, TransaksiService, ResepService, StokObatService]
})

export class ObatTebusFormComponent {	

	public allPasien: Pasien[];
	// public allTransaksiOfPasien: Transaksi[];	
	public allResepOfTanggal: Resep[];

	public pasien: Pasien;
	public resep: Resep;

	public obatTebus: ObatTebus;
	public obatTebusItems: ObatTebusItem[];

	public allStokObatAtLocation: StokObat[];

	public no_batch: string[][];
	public jumlah: number[][];

	inputPasienFormatter = (value : Pasien) => value.nama_pasien;
	resultPasienFormatter = (value: Pasien)	=> value.nama_pasien + ' - ' + value.id;	

	inputStokFormatter = (value : StokObat) => value.obat_masuk.nomor_batch;
	resultStokFormatter = (value: StokObat)	=> value.obat_masuk.nomor_batch;	

	searchStokObat = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allStokObatAtLocation.filter(stokObat => stokObat.jenis_obat.merek_obat.toLowerCase().indexOf(term.toLowerCase()) > -1));


	searchNamaPasien = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allPasien.filter(pasien => pasien.nama_pasien.toLowerCase().indexOf(term.toLowerCase()) > -1));

	/*
	// TO-DO: Input batch numbers
	searchNoBatch = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allResepOfTanggal.filter(resep => resep.no_resep.toString().toLowerCase().indexOf(term.toLowerCase()) > -1));
	*/

	constructor (		
		private changeDetectorRef: ChangeDetectorRef,	
		private stokObatService: StokObatService,	
		private pasienService: PasienService,
		private transaksiService: TransaksiService,
		private resepService: ResepService,
	) {}

	ngOnInit(): void {
		this.pasienService.getAllPasien().subscribe(
			data => { this.allPasien = data }
		);

		// TO-DO: Change Location ID to dynamic based on which is the Apotek
		this.stokObatService.getStokObatByLocation(2).subscribe(
			data => { this.allStokObatAtLocation = data }
		);

		this.pasien = new Pasien();
		this.resep = new Resep();		
		this.obatTebus = new ObatTebus();

		this.allPasien = [];
		this.allResepOfTanggal =  [];
		this.obatTebusItems = [];
		
		this.no_batch = [];
		for (let i = 0; i < 50; i++) {
			this.no_batch[i] = []
		}

		this.jumlah = [];
		for (let i = 0; i < 50; i++) {  
			this.jumlah[i] = []
		}
	}

	private addPasien(pasien: Pasien) {	
		this.pasien = pasien;
	}

	private onTanggalResepChange(tanggal_resep: Date) {
		this.resepService.getResepByPasienAndTanggal(this.pasien.id, tanggal_resep).subscribe(
			data => { this.allResepOfTanggal = data }
		);
	}

	private onResepChange(id_resep: number) {
		this.resepService.getResep(id_resep).subscribe(
			data => { this.resep = data }
		);
	}

	private onTebusChange(e, i: number, j: number) {
		console.log(e);
		var isChecked = e.target.checked;
		if (isChecked) {
			// add ObatItem
		} else {			
			// remove ObatItem
		}
	}
}