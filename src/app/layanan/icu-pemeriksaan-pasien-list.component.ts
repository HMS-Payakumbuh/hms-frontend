import { Component, OnInit }		from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";

import { PemakaianKamar } 				from './pemakaian-kamar';
import { PemakaianKamarService }		    from './pemakaian-kamar.service';
import { Rawatinap }                from './rawatinap';
import { RawatinapService }                from './rawatinap.service';
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
 	selector: 'icu-pemeriksaan-pasien-list-page',
 	templateUrl: './icu-pemeriksaan-pasien-list.component.html',
 	providers: [PemakaianKamarService, 
	 			TenagaMedisService, 
				TindakanService,
				TransaksiService]
})

export class PemeriksaanICUPasienListComponent implements OnInit {
	allPemakaianKamar: PemakaianKamar[];
	allTenagaMedis: TenagaMedis[];

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

	public param;
	public selectedDate;

	constructor(
		private pemakaianKamarService: PemakaianKamarService,
		private tenagaMedisService: TenagaMedisService,
		private formBuilder: FormBuilder,
		private tindakanService: TindakanService,
		private transaksiService: TransaksiService,
        private route: ActivatedRoute
	) {}

	ngOnInit() {
        this.route.params
			.switchMap((params: Params) => this.pemakaianKamarService.getAllPemakaianKamarByNoKamar(params['noKamar']))
			.subscribe(data => this.allPemakaianKamar = data);
        
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
			data => { this.ngOnInit() }
		);
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
