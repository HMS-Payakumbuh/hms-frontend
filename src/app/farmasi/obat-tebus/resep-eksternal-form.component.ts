import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } 	from 'rxjs/Observable';
import { Location }					from '@angular/common';
import { Router } from '@angular/router';

import { Resep }                from '../resep/resep';
import { ResepItem }            from '../resep/resep-item';
import { RacikanItem }          from '../resep/racikan-item';
import { ResepService }         from '../resep/resep.service';

import { Pasien } from '../../pasien/pasien';
import { PasienService } from '../../pasien/pasien.service';

import { JenisObat }            from '../jenis-obat/jenis-obat';
import { JenisObatService }     from '../jenis-obat/jenis-obat.service';

import { Transaksi } from '../../transaksi/transaksi';
import { TransaksiService } from '../../transaksi/transaksi.service';

@Component({
  selector: 'resep-eksternal-form-page',
  templateUrl: './resep-eksternal-form.component.html',
  providers: [ResepService, PasienService, JenisObatService, TransaksiService]
})

export class ResepEksternalFormComponent {	

	allResep: Resep[] = [];		
	resep: Resep = new Resep();
  	allJenisObat: JenisObat[];

  	// noPasien: number;

	public allPasien: Pasien[];
	public pasien: Pasien;

	public transaksi: Transaksi;

  	inputPasienFormatter = (value : Pasien) => value.nama_pasien;
	resultPasienFormatter = (value: Pasien)	=> value.nama_pasien + ' - ' + value.id;	

    inputJenisObatFormatter = (value : JenisObat) => value.merek_obat;
  	resultJenisObatFormatter = (value: JenisObat)	=> value.merek_obat;

	searchJenisObat = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.allJenisObat.filter(jenisObat => jenisObat.merek_obat.toLowerCase().indexOf(term.toLowerCase()) > -1));

    searchNamaPasien = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allPasien.filter(pasien => pasien.nama_pasien.toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private location: Location,
   		private resepService: ResepService,   		
   		private jenisObatService: JenisObatService,
		private pasienService: PasienService,
		private transaksiService: TransaksiService,
   		private router: Router,
	) { }

	ngOnInit() {
		this.addResepItem(this.resep);

		this.pasienService.getAllPasien().subscribe(
			data => { this.allPasien = data }
		);

	    this.jenisObatService.getAllJenisObat().subscribe(
	      data => { this.allJenisObat = data }
	    )

		this.pasien = new Pasien();
	}

	private addPasien(pasien: Pasien) {	
		this.pasien = pasien;

		this.transaksiService.getLatestOpenTransaksi(this.pasien.id).subscribe(
			data => { 
				this.transaksi = data;
				this.resep.id_transaksi = this.transaksi.id;
				console.log(this.resep);
			}
		);
	}

	addResepItem(resep: Resep) {
	    let resepItem = new ResepItem();
	    resep.resep_item.push(resepItem);
  	}

	removeResepItem(i: number, resep: Resep) {
		resep.resep_item.splice(i, 1);
	}

	addRacikanItem(resepItem: ResepItem) {
	    let racikanItem = new RacikanItem();
	    resepItem.racikan_item.push(racikanItem);
  	}

  	removeRacikanItem(i: number, resepItem: ResepItem) {
    	resepItem.racikan_item.splice(i, 1);
  	}

	addSelectedJenisObat(racikanItem: RacikanItem, jenisObat: JenisObat) {
	    racikanItem.id_jenis_obat = jenisObat.id;
	    racikanItem.jenis_obat = jenisObat;
	}

	save() {		
		this.resep.tebus = true;
		console.log(this.resep);
		
		this.allResep.push(this.resep);
	    this.resepService.createResep(this.allResep).subscribe(
	     	data => {
	     		console.log(data[0]);
		     	this.router.navigateByUrl('/obat-tebus-eksternal-form/' + data[0].id);
		     	return true;
	   		},
		   	error => {
		        console.error("Error saving!");
		        return Observable.throw(error);
		   	}
	    )
  	}

}