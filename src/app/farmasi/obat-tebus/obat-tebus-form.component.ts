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
  providers: [ObatTebusService, PasienService, TransaksiService, ResepService]
})

export class ObatTebusFormComponent {	

	public allPasien: Pasien[];
	public allTransaksiOfPasien: Transaksi[];	
	public allResepOfTransaksi: Resep[];

	public pasien: Pasien;
	public transaksi: Transaksi;
	public resep: Resep;

	inputPasienFormatter = (value : Pasien) => value.nama_pasien;
	resultPasienFormatter = (value: Pasien)	=> value.nama_pasien + ' - ' + value.id;	

	inputTransaksiFormatter = (value : Transaksi) => value.no_transaksi;
	resultTransaksiFormatter = (value: Transaksi)	=> value.no_transaksi	

	inputResepFormatter = (value : Resep) => value.no_resep;
	resultResepFormatter = (value: Resep)	=> value.no_resep;	

	searchNamaPasien = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allPasien.filter(pasien => pasien.nama_pasien.toLowerCase().indexOf(term.toLowerCase()) > -1));

	searchNoTransaksi = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allTransaksiOfPasien.filter(transaksi => transaksi.no_transaksi.toLowerCase().indexOf(term.toLowerCase()) > -1));

	searchNoResep = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allResepOfTransaksi.filter(resep => resep.no_resep.toString().toLowerCase().indexOf(term.toLowerCase()) > -1));


	constructor (		
		private changeDetectorRef: ChangeDetectorRef,
		private pasienService: PasienService,
		private transaksiService: TransaksiService,
		private resepService: ResepService,
	) {}

	ngOnInit(): void {
		this.pasienService.getAllPasien().subscribe(
			data => { this.allPasien = data }
		);
	}

	addPasien(pasien: Pasien) {	
		this.pasien = pasien;

		this.transaksiService.getTransaksiByPasien(this.pasien.id).subscribe(
			data => { this.allTransaksiOfPasien = data }
		)
	}

	addTransaksi(transaksi: Transaksi) {
		this.transaksi = transaksi;

		this.resepService.getResepByTransaksi(this.transaksi.id).subscribe(
			data => { this.allResepOfTransaksi = data }
		)
	}

	addResep(resep: Resep) {
		this.resep = resep;

		this.resepService.getResepByTransaksi(this.transaksi.id).subscribe(
			data => { this.allResepOfTransaksi = data }
		)
	}

	addObatEntry() {
	    /* this.rowData.push({
	    	kode_obat: 1,
	    }) */
	}

	removeObatEntry(rowNumber: number) {
	    /* this.rowData.splice(rowNumber, 1);
    	this.changeDetectorRef.detectChanges(); */
	}
}