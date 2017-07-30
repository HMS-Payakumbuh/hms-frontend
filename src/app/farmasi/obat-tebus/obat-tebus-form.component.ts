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
	public allResep: Resep[];

	public pasien: Pasien;
	public resep: Resep;

	public obatTebus: ObatTebus;
	public obatTebusItems: ObatTebusItem[];

	public allStokObatAtLocation: StokObat[];

	public id_jenis_obat: number[][];
	public no_batch: string[][];
	public jumlah: number[][];
	public harga_jual_realisasi: number[][];
	public tebus: boolean[][];
	public id_resep_item: number[][];
	public id_racikan_item: number[][];

	public resepItemCount: number;	
	public racikanItemCount: number[];

	inputPasienFormatter = (value : Pasien) => value.nama_pasien;
	resultPasienFormatter = (value: Pasien)	=> value.nama_pasien + ' - ' + value.id;	

	inputStokFormatter = (value : StokObat) => value.nomor_batch;
	resultStokFormatter = (value: StokObat)	=> value.nomor_batch;	

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
		private obatTebusService: ObatTebusService,	
		private stokObatService: StokObatService,	
		private pasienService: PasienService,
		private transaksiService: TransaksiService,
		private resepService: ResepService,		
		private location: Location
	) {}

	ngOnInit(): void {
		this.pasienService.getAllPasien().subscribe(
			data => { this.allPasien = data }
		);

		this.stokObatService.getStokObatByLocationType(1).subscribe( // 1 adalah kode untuk jenis lokasi apotek
			data => { this.allStokObatAtLocation = data }
		);

		this.pasien = new Pasien();
		this.resep = new Resep();		
		this.obatTebus = new ObatTebus();

		this.allPasien = [];
		this.allResep =  [];
		this.obatTebusItems = [];
		
		this.id_jenis_obat = [];
		for (let i = 0; i < 50; i++) {
			this.id_jenis_obat[i] = [];
		}
		this.no_batch = [];
		for (let i = 0; i < 50; i++) {
			this.no_batch[i] = [];
		}

		this.jumlah = [];
		for (let i = 0; i < 50; i++) {  
			this.jumlah[i] = [];
		}

		this.harga_jual_realisasi = [];
		for (let i = 0; i < 50; i++) {  
			this.harga_jual_realisasi[i] = [];
		}

		this.id_resep_item = [];
		for (let i = 0; i < 50; i++) {  
			this.id_resep_item[i] = [];
		}

		this.id_racikan_item = [];
		for (let i = 0; i < 50; i++) {  
			this.id_racikan_item[i] = [];
		}

		this.tebus = [];
		for (let i = 0; i < 50; i++) {  
			this.tebus[i] = [];
		}

		this.resepItemCount = 0;

		this.racikanItemCount = [];
		for (let i = 0; i < 50; i++) {  
			this.racikanItemCount[i] = 0;
		}

	}

	private addPasien(pasien: Pasien) {	
		this.pasien = pasien;

		this.resepService.getResepByPasien(this.pasien.id).subscribe(
			data => { this.allResep = data }
		);
	}

	/* private onTanggalResepChange(tanggal_resep: Date) {
		this.resepService.getResepByPasienAndTanggal(this.pasien.id, tanggal_resep).subscribe(
			data => { this.allResepOfTanggal = data }
		);
	} */

	private onResepChange(id_resep: number) {
		this.resepService.getResep(id_resep).subscribe(
			data => { 
				this.resep = data; 

				let i = 0;
				let j = 0;
				for (let resep_item of this.resep.resep_item) {  					
					j = 0;	
					for (let racikan_item of resep_item.racikan_item) {  						
						this.id_jenis_obat[i][j] = racikan_item.id_jenis_obat;
						this.harga_jual_realisasi[i][j] = racikan_item.jenis_obat.harga_jual_satuan;
						this.jumlah[i][j] = racikan_item.jumlah;		
						this.id_resep_item[i][j] = resep_item.id;
						this.id_racikan_item[i][j] = racikan_item.id;
						j = j + 1;
					}			
					this.racikanItemCount[i] = j;				
					i = i + 1;	
				}
				this.resepItemCount = i;
			}					
		);		
	}

	private onTebusChange(e, i : number, j: number, ) {
		var isChecked = e.target.checked;
		if (isChecked) {
			this.tebus[i][j] = true;
		} else {			
			this.tebus[i][j] = false;		
		}
	}

	private save() { // STILL NEEDS REPAIR
		let observables = [];
		let stokObat = new StokObat();

		for (let i = 0; i < this.resepItemCount; i++) {  
			for (let j = 0; j < this.racikanItemCount[i] ; j++) {  		
				// if (this.tebus[i][j]) {										
					observables.push(
				   		this.stokObatService.getStokObatByJenisObatAndBatch(this.id_jenis_obat[i][j], this.no_batch[i][j], 2)
				   	)
				// }
			}
		}

		Observable.forkJoin(observables).subscribe(
		    data => {					
				let k = 0;
				for (let i = 0; i < this.resepItemCount; i++) {  
					for (let j = 0; j < this.racikanItemCount[i] ; j++) {  	
						if (this.tebus[i][j]) {
							let temp = new ObatTebusItem();

							let dataTemp: any = {};
							dataTemp = data[k];
							stokObat = dataTemp;

							temp.jumlah = this.jumlah[i][j];
						    temp.keterangan = '';

							temp.id_jenis_obat = stokObat.id_jenis_obat;
					    	temp.id_stok_obat = stokObat.id;
					    	temp.harga_jual_realisasi = this.harga_jual_realisasi[i][j];
					    	temp.asal = 2;
					    	temp.id_resep_item = this.id_resep_item[i][j];
					    	temp.id_racikan_item = this.id_racikan_item[i][j];	  

					    	this.obatTebusItems.push(temp);

					    	k = k + 1;
						}
					}
				}

		        this.obatTebus.id_transaksi = this.resep.id_transaksi;
				this.obatTebus.id_resep = this.resep.id;
				this.obatTebus.obat_tebus_item = this.obatTebusItems;

				// alert(JSON.stringify(this.obatTebus)); 

				this.obatTebusService.createObatTebus(this.obatTebus).subscribe(
			       	data => {
			         	this.location.back();
			         	return true;
			       	},
			       	error => {
				        console.error("Error saving!");
				        this.obatTebusItems = [];
				        return Observable.throw(error);
			       	}
			    )
	    	}
		);
	}
}