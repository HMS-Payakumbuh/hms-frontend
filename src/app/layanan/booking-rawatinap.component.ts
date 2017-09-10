import { Component, OnInit }		from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { PemakaianKamar } 				from './pemakaian-kamar';
import { PemakaianKamarService }		    from './pemakaian-kamar.service';
import { TenagaMedis } 				from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }		    from '../tenaga-medis/tenaga-medis.service';
import { TindakanReference } 				from './tindakan-reference';
import { Tindakan } 				from './tindakan';
import { TindakanService }		    from './tindakan.service';
import { Transaksi } 				from '../transaksi/transaksi';
import { TransaksiService }		    from '../transaksi/transaksi.service';
import { Tempattidur }          from './tempattidur';
import { TempattidurService }		from './tempattidur.service';
import { Dokter }		from '../tenaga-medis/dokter';
import { Pasien } from '../pasien/pasien';
import { PasienService } from '../pasien/pasien.service';
import { Poliklinik }						from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';


@Component({
 	selector: 'booking-rawatinap-page',
 	templateUrl: './booking-rawatinap.component.html',
 	providers: [PemakaianKamarService, 
	 			TenagaMedisService, 
				TindakanService,
				PasienService,
				TempattidurService,
				TransaksiService,
				ToastyService]
})

export class BookingRawatinapComponent implements OnInit {
	allPemakaianKamar: PemakaianKamar[];
	allTenagaMedis: TenagaMedis[];
	allDokter: Dokter[];
	allTempatTidur: Tempattidur[];

	public transaksi: Transaksi;

	tanggalOperasi: Date;
	waktuMasuk: string;
	waktuKeluar: string;

	no_pegawai: string;

	pemakaianKamarModal: PemakaianKamar = null;
	PemakaianKamarModalId: number = null;
	tempatTidurModal : Tempattidur = null;

	transaksi2 : any = null;
	poliklinik: Poliklinik;
	addForm: FormGroup;

	public allPasien: Pasien[];
	public pasien: Pasien;

	today: string;

	public selectedDate;
	public param;
	public config;


	inputPasienFormatter = (value : Pasien) => value.nama_pasien;
	resultPasienFormatter = (value: Pasien)	=> value.nama_pasien + ' - ' + value.kode_pasien;

	inputDokterFormatter = (value : Dokter) => value.tenaga_medis.nama;
	resultDokterFormatter = (value: Dokter)	=> value.tenaga_medis.nama + ' - ' + value.spesialis + ' - ' + value.no_pegawai;

	searchNamaPasien = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allPasien.filter(pasien => pasien.nama_pasien.toLowerCase().indexOf(term.toLowerCase()) > -1));

	searchNamaDokter = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allDokter.filter(dokter => dokter.tenaga_medis.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private pemakaianKamarService: PemakaianKamarService,
		private tenagaMedisService: TenagaMedisService,
		private tempattidurService: TempattidurService,
		private formBuilder: FormBuilder,
		private tindakanService: TindakanService,
		private transaksiService: TransaksiService,
		private pasienService: PasienService,
		private toastyService: ToastyService
	) {}

	ngOnInit() {
		this.pemakaianKamarService.getDaftarPemakaianKamarBooked().subscribe(
     		data => { this.allPemakaianKamar = data }
    	);

		this.pasienService.getAllPasien().subscribe(
			data => { this.allPasien = data }
		);

		this.tenagaMedisService.getAllDokter().
			subscribe(data => this.allDokter = data);

		this.today = new Date().toISOString().slice(0, 10);
	}

	private addPasien(pasien: Pasien) {	
		this.pasien = pasien;

		this.transaksiService.getLatestOpenTransaksi(this.pasien.id).subscribe(
			data => { 
				this.transaksi = data;
				this.pemakaianKamarModal.id_transaksi = this.transaksi.id;
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

	private setNoPegawai(dokter: Dokter) {
		this.pemakaianKamarModal.no_pegawai = dokter.no_pegawai;
	}

	newPemakaianKamarRawatinap(pemakaianKamar: any) {
		this.pemakaianKamarModal = new PemakaianKamar();
		this.pemakaianKamarModal.id = pemakaianKamar.id;
		this.pemakaianKamarModal.no_kamar = pemakaianKamar.no_kamar;
		this.pemakaianKamarModal.harga = pemakaianKamar.harga;
		this.pemakaianKamarModal.no_tempat_tidur = pemakaianKamar.no_tempat_tidur;

		this.tempatTidurModal = new Tempattidur();
		this.tempatTidurModal.no_tempat_tidur = this.pemakaianKamarModal.no_tempat_tidur;
		this.tempatTidurModal.no_kamar = pemakaianKamar.no_kamar;
		this.tempatTidurModal.status = 0;
 	}

	editPemakaianKamarRawatinap(id : number, PemakaianKamarRawatinap: PemakaianKamar) {
		this.pemakaianKamarModal = Object.assign({}, PemakaianKamarRawatinap);
		this.pemakaianKamarService.masukBookingKamar(id, this.pemakaianKamarModal).subscribe(
			data => { 
				this.tempattidurService.updateTempatTidur(this.tempatTidurModal, this.pemakaianKamarModal.no_kamar, this.pemakaianKamarModal.no_tempat_tidur).subscribe(
					data => { this.ngOnInit() }
				);
            }
		);
	}

	destroyPemakaianKamarRawatinap(id: number) {
		this.pemakaianKamarService.destroyBookingKamar(id).subscribe(
			data => { 
                this.ngOnInit() 
            }
		);
	}
}
