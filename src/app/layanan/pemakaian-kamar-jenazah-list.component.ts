import { Component, OnInit }		from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { PemakaianKamarJenazah } 				from './pemakaian-kamar-jenazah';
import { PemakaianKamarJenazahService }		    from './pemakaian-kamar-jenazah.service';
import { KamarJenazah } 				from './kamar-jenazah';
import { KamarJenazahService }		    from './kamar-jenazah.service';
import { TenagaMedis } 				from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }		    from '../tenaga-medis/tenaga-medis.service';
import { TindakanReference } 				from './tindakan-reference';
import { TindakanService }		    from './tindakan.service';
import { Transaksi } 				from '../transaksi/transaksi';
import { TransaksiService }		    from '../transaksi/transaksi.service';
import { Pasien } from '../pasien/pasien';
import { PasienService } from '../pasien/pasien.service';

@Component({
 	selector: 'pemakaian-kamar-jenazah-list-page',
 	templateUrl: './pemakaian-kamar-jenazah-list.component.html',
 	providers: [PemakaianKamarJenazahService, 
	 			TenagaMedisService, 
				TindakanService,
				TransaksiService,
				PasienService,
				KamarJenazahService,
				ToastyService]
})

export class PemakaianKamarJenazahListComponent implements OnInit {
	allPemakaianKamarJenazah: PemakaianKamarJenazah[];
	allKamarJenazah: KamarJenazah[];

	transaksi: any;

	public allPasien: Pasien[];
  	public pasien: Pasien;

	tanggalOperasi: Date;
	waktuMasuk: Date;
	waktuKeluar: Date;

	pemakaianKamarJenazahModal: PemakaianKamarJenazah = null;
	pemakaianKamarJenazahModalId: number = null;

	public selectedDate;
	public param;
	public config;
	
	inputPasienFormatter = (value : Pasien) => value.nama_pasien;
    resultPasienFormatter = (value: Pasien)	=> value.nama_pasien + ' - ' + value.kode_pasien;

    searchNamaPasien = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allPasien.filter(pasien => pasien.nama_pasien.toLowerCase().indexOf(term.toLowerCase()) > -1));
	
	constructor(
		private PemakaianKamarJenazahService: PemakaianKamarJenazahService,
		private tenagaMedisService: TenagaMedisService,
		private tindakanService: TindakanService,
		private transaksiService: TransaksiService,
		private pasienService: PasienService,
		private kamarJenazahService: KamarJenazahService,
		private toastyService: ToastyService
	) {}
	
	ngOnInit() {
		this.PemakaianKamarJenazahService.getAllPemakaianKamarJenazah().subscribe(
     		data => { this.allPemakaianKamarJenazah = data }
    	);

		this.kamarJenazahService.getAllKamarJenazah().subscribe(
			data =>  { this.allKamarJenazah = data }
		);

		this.pasienService.getAllPasien().subscribe(
			data => { this.allPasien = data }
		);
	}

	private addPasien(pasien: Pasien) {
		this.pasien = pasien;

		this.transaksiService.getLatestOpenTransaksi(this.pasien.id).subscribe(
			data => {
				this.transaksi = data;
				this.pemakaianKamarJenazahModal.id_transaksi = this.transaksi.id;
			},
			error => {
				let toastOptions: ToastOptions = {
					title: "Error",
					msg: "Pasien tidak mempunyai transaksi yang open, masukkan pasien lain",
					showClose: true,
					timeout: 5000,
					theme: 'material'
				};
				this.toastyService.error(toastOptions);
			}
		);
	}
	
	newPemakaianKamarJenazah() {
    	this.pemakaianKamarJenazahModal = new PemakaianKamarJenazah();
		this.pemakaianKamarJenazahModal.harga = 300000;
 	}

    createPemakaianKamarJenazah() {
    	this.PemakaianKamarJenazahService.createPemakaianKamarJenazah(this.pemakaianKamarJenazahModal).subscribe(
			data => { 
				  this.ngOnInit();
				  let toastOptions:ToastOptions = {
					title: "Success",
					msg: "Pendaftaran pemakaian kamar jenazah berhasil",
					showClose: true,
					timeout: 5000,
					theme: 'material'
				};

				this.toastyService.success(toastOptions);
			}
    	);
  	}

	editPemakaianKamarJenazah(id : number, PemakaianKamarJenazah: PemakaianKamarJenazah) {
		this.pemakaianKamarJenazahModalId = id;
		this.pemakaianKamarJenazahModal = Object.assign({}, PemakaianKamarJenazah);
		this.PemakaianKamarJenazahService.updatePemakaianKamarJenazah(this.pemakaianKamarJenazahModalId, this.pemakaianKamarJenazahModal).subscribe(
			data => { this.ngOnInit() }
		);
	}

	destroyPemakaianKamarJenazah(id: number) {		
		this.PemakaianKamarJenazahService.destroyPemakaianKamarJenazah(id).subscribe(
			data => { this.ngOnInit() }
		);
	}
}