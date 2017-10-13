import { Component, OnInit }		from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";

import { PemakaianKamar } 				from './pemakaian-kamar';
import { PemakaianKamarService }		    from './pemakaian-kamar.service';
import { TenagaMedis } 				from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }		    from '../tenaga-medis/tenaga-medis.service';
import { TindakanReference } 				from './tindakan-reference';
import { Tindakan } 				from './tindakan';
import { TindakanService }		    from './tindakan.service';
import { Transaksi } 				from '../transaksi/transaksi';
import { TransaksiService }		    from '../transaksi/transaksi.service';

import { Poliklinik }						from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';


@Component({
 	selector: 'pemakaian-kamar-page',
 	templateUrl: './pemakaian-kamar.component.html',
 	providers: [PemakaianKamarService, 
	 			TenagaMedisService, 
				TindakanService,
				TransaksiService,
				ToastyService]
})

export class PemakaianKamarListComponent implements OnInit {
	allPemakaianKamar: PemakaianKamar[];
	allTenagaMedis: TenagaMedis[];
	checkTransaksi: PemakaianKamar[];

	transaksi: Transaksi[];

	tanggalOperasi: Date;
	waktuMasuk: string;
	waktuKeluar: string;

	no_pegawai: string;

	PemakaianKamarModal: PemakaianKamar = null;
    PemakaianKamarModalId: number = null;

	transaksi2 : any = null;
	poliklinik: Poliklinik;
	addForm: FormGroup;

	public selectedDate;
	public param;
	public config;


	constructor(
		private pemakaianKamarService: PemakaianKamarService,
		private tenagaMedisService: TenagaMedisService,
		private formBuilder: FormBuilder,
		private tindakanService: TindakanService,
		private transaksiService: TransaksiService,
		private toastyService: ToastyService
	) {}

	ngOnInit() {
		this.pemakaianKamarService.getAllPemakaianKamarRawatinap().subscribe(
     		data => { this.allPemakaianKamar = data }
		);

		this.tenagaMedisService.getAllTenagaMedis().
			subscribe(data => this.allTenagaMedis = data);

	}

	newPemakaianKamarRawatinap() {
    	this.PemakaianKamarModal = new PemakaianKamar();
 	}

	editPemakaianKamarRawatinap(id : number, PemakaianKamarRawatinap: PemakaianKamar) {
		this.PemakaianKamarModalId = id;
		this.PemakaianKamarModal = Object.assign({}, PemakaianKamarRawatinap);
		this.pemakaianKamarService.updatePemakaianKamar(this.PemakaianKamarModalId, this.PemakaianKamarModal.no_kamar, this.PemakaianKamarModal.no_tempat_tidur, this.PemakaianKamarModal).subscribe(
			data => { 
				// let payload: any = {
				// 	status: 'closed'
				// };
				// let transaksi: any = {
				// 	transaksi: payload
				// };

				// this.transaksiService.updateTransaksi(transaksi, PemakaianKamarRawatinap.id_transaksi)
				// .subscribe(data => {
				// 	console.log(data);
				// });
				this.ngOnInit();

				let toastOptions:ToastOptions = {
					title: "Success",
					msg: "Checkout berhasil",
					showClose: true,
					timeout: 5000,
					theme: 'material'
				};

				this.toastyService.success(toastOptions);
		});
	}

	destroyPemakaianKamarRawatinap(id: number, PemakaianKamarRawatinap: PemakaianKamar) {
		this.PemakaianKamarModalId = id;
		this.PemakaianKamarModal = Object.assign({}, PemakaianKamarRawatinap);
		this.pemakaianKamarService.destroyPemakaianKamar(id, this.PemakaianKamarModal.no_kamar, this.PemakaianKamarModal.no_tempat_tidur).subscribe(
			data => { this.ngOnInit() }
		);
	}

	getRecentTransaksi(nama_pasien: string) {
		this.transaksiService.getRecentTransaksi(nama_pasien).
			subscribe(data => {
				this.transaksi = data;
				//this.PemakaianKamarModal.id_transaksi = this.transaksi.id;
				this.transaksiService.getTransaksi(this.PemakaianKamarModal.id_transaksi)
					.subscribe(transaksi => this.transaksi2 = transaksi);
			})
	}
}
