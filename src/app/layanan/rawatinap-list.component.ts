import { Component, OnInit }		from '@angular/core';
import { Location }					from '@angular/common';
import { Observable } 	from 'rxjs/Observable';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';
import { Rawatinap }			from './rawatinap';
import { RawatinapService }		from './rawatinap.service';
import { Tempattidur }          from './tempattidur';
import { TempattidurService }		from './tempattidur.service';
import { PemakaianKamar }          from './pemakaian-kamar';
import { PemakaianKamarService }   from './pemakaian-kamar.service';
import { TenagaMedis }		from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }		from '../tenaga-medis/tenaga-medis.service';
import { Dokter }		from '../tenaga-medis/dokter';
import { Pasien } from '../pasien/pasien';
import { PasienService } from '../pasien/pasien.service';

@Component({
 	selector: 'rawatinap-list-page',
 	templateUrl: './rawatinap-list.component.html',
 	providers: [
		 RawatinapService,
         TempattidurService,
		 PemakaianKamarService,
         TransaksiService,
		 TenagaMedisService,
		 PasienService,
		 ToastyService
	]
})

export class RawatinapListComponent implements OnInit {
	allRawatinap: Rawatinap[];
	allJenis = ['', 'Rawat Inap', 'ICU'];
	allKelas = ['', 'VIP', '1', '2', '3'];

	public allPasien: Pasien[];
	public pasien: Pasien;

	public transaksi: Transaksi;

	allTempatTidur: Tempattidur[];
	allDokter: Dokter[];
	allPemakaianKamarBooked : PemakaianKamar[];

	pemakaianKamarModal: PemakaianKamar = null;
	tempatTidurModal : Tempattidur = null;
    pemakaianKamarModalNama: string = null;

	rawatinap: Rawatinap;

	public searchParam;
	public kelas;
	

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
		private rawatinapService: RawatinapService,
		private transaksiService: TransaksiService,
		private tempattidurService: TempattidurService,
		private pemakaianKamarService: PemakaianKamarService,
		private tenagaMedisService: TenagaMedisService,
		private pasienService: PasienService,
		private toastyService: ToastyService,
		private location: Location
	) {}

	ngOnInit() {
		this.rawatinapService.getAllAvailableRawatinap().subscribe(
     		data => { this.allRawatinap = data }
    	);

		this.pasienService.getAllPasien().subscribe(
			data => { this.allPasien = data }
		);

		this.tenagaMedisService.getAllDokter().
			subscribe(data => this.allDokter = data);

		this.pasien = new Pasien();
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

	newPemakaianKamar(rawatinap: Rawatinap) {
		this.tempattidurService.getAllAvailableTempatTidur(rawatinap.no_kamar)
			.subscribe(data => {
				this.allTempatTidur = data;
			}
		);

    	this.pemakaianKamarModal = new PemakaianKamar();
		this.pemakaianKamarModal.no_kamar = rawatinap.no_kamar;
		this.pemakaianKamarModal.harga = rawatinap.harga_per_hari;

		this.tempatTidurModal = new Tempattidur();
		this.tempatTidurModal.no_kamar = rawatinap.no_kamar;
		this.tempatTidurModal.status = 0;
 	}

	setTempatTidur() {
		this.tempatTidurModal.no_tempat_tidur = this.pemakaianKamarModal.no_tempat_tidur;
	}

	private validateInput(): boolean {
		if	(this.pemakaianKamarModal.id_transaksi == null) {
			this.handleError("Nama pasien wajib diisi");
			return false;
		} else if (this.pemakaianKamarModal.no_tempat_tidur == null) {
			this.handleError("No. tempat tidur wajib diisi");
			return false;
		} else if (this.pemakaianKamarModal.no_pegawai == null) {
			this.handleError("Nama dokter wajib diisi");
			return false;
		}
		else {
			return true;
		}
	}

	private handleError(error: any) {
		let toastOptions: ToastOptions = {
	        title: "Error",
	        msg: error,
	        showClose: true,
	        timeout: 5000,
	        theme: 'material'
	    };
    	this.toastyService.error(toastOptions);
	}

    createPemakaianKamar(noKamar: string, noTempatTidur: number) {
		if(this.validateInput()) {
			this.pemakaianKamarService.createPemakaianKamar(noKamar,this.pemakaianKamarModal).subscribe(
				data => {
					this.tempattidurService.updateTempatTidur(this.tempatTidurModal, noKamar, noTempatTidur).subscribe(
						data => {
							this.ngOnInit();
							let toastOptions:ToastOptions = {
								title: "Success",
								msg: "Pasien sudah terdaftar di kamar  " + noKamar,
								showClose: true,
								timeout: 5000,
								theme: 'material'
							};

							this.toastyService.success(toastOptions);
						}
					);
				}
			);
		}
	}
}
