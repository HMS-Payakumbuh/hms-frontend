import { Component, OnInit }		from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";

import { PemakaianKamarOperasi } 				from './pemakaian-kamar-operasi';
import { PemakaianKamarOperasiService }		    from './pemakaian-kamar-operasi.service';
import { KamarOperasi } 				from './kamar-operasi';
import { KamarOperasiService }		    from './kamar-operasi.service';
import { TenagaMedis } 				from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }		    from '../tenaga-medis/tenaga-medis.service';
import { TindakanReference } 				from './tindakan-reference';
import { Tindakan } 				from './tindakan';
import { TindakanService }		    from './tindakan.service';
import { TindakanOperasi }			from './tindakan-operasi';
import { TindakanOperasiService }			from './tindakan-operasi.service';
import { Transaksi } 				from '../transaksi/transaksi';
import { TransaksiService }		    from '../transaksi/transaksi.service';

import { Poliklinik }						from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';


@Component({
 	selector: 'pemakaian-kamar-operasi-list-page',
 	templateUrl: './pemakaian-kamar-operasi-list.component.html',
 	providers: [PemakaianKamarOperasiService,
	 			TenagaMedisService,
				TindakanService,
				TindakanOperasiService,
				TransaksiService,
				KamarOperasiService]
})

export class PemakaianKamarOperasiListComponent implements OnInit {
	allPemakaianKamarOperasi: PemakaianKamarOperasi[];
	allKamarOperasi: KamarOperasi[];
	allTenagaMedis: TenagaMedis[];
	allTindakanReference: TindakanReference[];

	transaksi: Transaksi[];

	tanggalOperasi: Date;
	waktuMasuk: string;
	waktuKeluar: string;

	no_pegawai: string;
	noTenagaMedis: string[];

	pemakaianKamarOperasiModal: PemakaianKamarOperasi = null;
    pemakaianKamarOperasiModalNama: string = null;

	selectedTindakan: Tindakan[] = [];
	savedTindakan: Tindakan[] = [];
	savedTindakanOperasi: TindakanOperasi[] = [];
 	selectedTindakanReference: TindakanReference[] = [];

	transaksi2 : any = null;
	poliklinik: Poliklinik;
	addForm: FormGroup;

	tindakanOperasi : TindakanOperasi[];

	inputFormatter = (value : any) => value.nama;
	resultFormatter = (value : any) => value.kode + ' - ' + value.nama;

	searchTindakan = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allTindakanReference.filter(tindakanReference => tindakanReference.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));



	constructor(
		private pemakaianKamarOperasiService: PemakaianKamarOperasiService,
		private tenagaMedisService: TenagaMedisService,
		private formBuilder: FormBuilder,
		private tindakanService: TindakanService,
		private transaksiService: TransaksiService,
		private kamarOperasiService: KamarOperasiService,
		private tindakanOperasiService : TindakanOperasiService
	) {}

	ngOnInit() {
		this.pemakaianKamarOperasiService.getAllPemakaianKamarOperasi().subscribe(
     		data => { this.allPemakaianKamarOperasi = data }
    	);
		

		this.kamarOperasiService.getAllKamarOperasi().subscribe(
			data =>  { this.allKamarOperasi = data }
		);

		this.tindakanService.getAllTindakanReference().subscribe(
			data => {  this.allTindakanReference = data }
		);

		this.tenagaMedisService.getAllTenagaMedis().
			subscribe(data => this.allTenagaMedis = data);
	}

	newPemakaianKamarOperasi() {
    	this.pemakaianKamarOperasiModal = new PemakaianKamarOperasi();
		// this.pemakaianKamarOperasiModal.waktu_masuk = "2017-07-07 07:00:00";
		// this.pemakaianKamarOperasiModal.waktu_keluar = "2017-07-07 12:00:00";
 	}

	showDetailPemakaianKamarOperasi(pemakaianKamarOperasiId: number, pemakaianKamarOperasi: PemakaianKamarOperasi) {
		this.pemakaianKamarOperasiModal = Object.assign({}, pemakaianKamarOperasi);
		this.tindakanOperasiService.getTenagaMedisByTindakanOperasi(pemakaianKamarOperasiId).subscribe(
			data => {	this.tindakanOperasi = data   }
		);
	}

	updatePemakaianKamarOperasi() {
		this.pemakaianKamarOperasiService.updatePemakaianKamarOperasi(this.pemakaianKamarOperasiModalNama, this.pemakaianKamarOperasiModal).subscribe(
			data => { window.location.reload() }
		);
	}

	destroyPemakaianKamarOperasi(id: number) {
		this.pemakaianKamarOperasiService.destroyPemakaianKamarOperasi(id).subscribe(
			data => { window.location.reload() }
		);
	}

	getRecentTransaksi(nama_pasien: string) {
		this.transaksiService.getRecentTransaksi(nama_pasien).
			subscribe(data => {
				this.transaksi = data;
			})
	}

	getTransaksi2() {
		this.transaksiService.getTransaksi(this.pemakaianKamarOperasiModal.id_transaksi)
			.subscribe(transaksi => this.transaksi2 = transaksi);
	}

	getTanggalOperasi() {
		this.pemakaianKamarOperasiModal.waktu_masuk = this.tanggalOperasi + " " +  this.waktuMasuk;
		this.pemakaianKamarOperasiModal.waktu_keluar = this.tanggalOperasi + " " +  this.waktuKeluar;
	}

	getTenagaMedis() {
		this.noTenagaMedis = this.no_pegawai.toString().split(",");
	}

	addSelectedTindakan(tindakanReference: TindakanReference) {
		this.selectedTindakanReference.push(tindakanReference);
		let temp = new Tindakan();
		temp.id_transaksi = this.transaksi2.transaksi.id;
		temp.harga = tindakanReference.harga;
		temp.keterangan = '';
		temp.id_pembayaran = null;
		temp.kode_tindakan = tindakanReference.kode;
		temp.id_pasien = this.transaksi2.transaksi.id_pasien;
		temp.tanggal_waktu = '2017-07-06 10:00:00';
		temp.np_tenaga_medis = null;
		temp.nama_poli = null;
		temp.nama_lab = null;
		temp.nama_ambulans = null;
		this.selectedTindakan.push(temp);
		
		this.noTenagaMedis.forEach(element => {
			let temp2 = new TindakanOperasi();
			temp2.id_tindakan = null;
			temp2.id_transaksi = this.transaksi2.transaksi.id;
			temp2.np_tenaga_medis = element;
			this.savedTindakanOperasi.push(temp2);
		});
	}

	isTindakanAlreadySelected() {
		return this.selectedTindakan.length == 1;
	}

	removeSelectedTindakan(i: number) {
		this.selectedTindakan.splice(i, 1);
    	this.selectedTindakanReference.splice(i, 1);
	}

	initResepEntry() {
		return this.formBuilder.group({
			obatResep: ['', Validators.required]
		});
	}

	addResepEntry() {
		const control = < FormArray > this.addForm.controls['resepEntry'];
		control.push(this.initResepEntry());
	}

	removeResepEntry(i: number) {
		const control = < FormArray > this.addForm.controls['resepEntry'];
		control.removeAt(i);
	}

	createPemakaianKamarOperasi() {
		this.tindakanService.saveTindakan(this.selectedTindakan).subscribe(
			data => { 
				console.log(data);
				this.tindakanOperasiService.createTindakanOperasi(this.savedTindakanOperasi).subscribe(
					data => { 
						console.log(data);
						this.pemakaianKamarOperasiService.createPemakaianKamarOperasi(this.pemakaianKamarOperasiModal).subscribe(
							data => {
								console.log(data);
								// window.location.reload();
							}
						);
					}	
				);
			}
		);
	}
}
