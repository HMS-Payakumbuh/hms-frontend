import { Component, OnInit }		from '@angular/core';
import { Location }					from '@angular/common';
import { ActivatedRoute, Params }	from '@angular/router';
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
 	selector: 'pindahicu-list-page',
 	templateUrl: './pindahicu-list.component.html',
 	providers: [RawatinapService,
         TempattidurService,
		 PemakaianKamarService,
         TransaksiService,
		 TenagaMedisService,
		 PasienService,
		 ToastyService]
})

export class PindahICUListComponent implements OnInit {
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
	pemakaianKamar : PemakaianKamar;

	public searchParam;
	public jenis;
	public kelas; 

	constructor(
		private rawatinapService: RawatinapService,
		private transaksiService: TransaksiService,
		private tempattidurService: TempattidurService,
		private pemakaianKamarService: PemakaianKamarService,
		private tenagaMedisService: TenagaMedisService,
		private pasienService: PasienService,
		private route: ActivatedRoute,
		private location: Location,
		private toastyService: ToastyService
	) {}

	ngOnInit() {
		this.rawatinapService.getAllAvailable().subscribe(
     		data => { this.allRawatinap = data }
		);
		
		this.route.params
			.switchMap((params: Params) => this.pemakaianKamarService.getPemakaianKamar(params['idPemakaian']))
			.subscribe( data =>  this.pemakaianKamar = data);
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
		this.pemakaianKamar.harga = this.pemakaianKamarModal.harga;

		this.tempatTidurModal = new Tempattidur();
		this.tempatTidurModal.no_kamar = rawatinap.no_kamar;
		this.tempatTidurModal.status = 0;		
 	}

	setTempatTidur() {
		this.tempatTidurModal.no_tempat_tidur = this.pemakaianKamarModal.no_tempat_tidur;
	}

	private validateInput(): boolean {
		if (this.pemakaianKamarModal.no_tempat_tidur == null) {
			this.handleError("No. tempat tidur wajib diisi");
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

    pindahPemakaianKamar(noKamar: string, noTempatTidur: number) {
		if(this.validateInput()) {
			this.pemakaianKamarService.pindahPemakaianKamar(this.pemakaianKamar.id, this.pemakaianKamar).subscribe(
				data => {
					this.tempattidurService.updateTempatTidur(this.tempatTidurModal, noKamar, noTempatTidur).subscribe(
						data => { 
							this.ngOnInit();
							let toastOptions:ToastOptions = {
								title: "Success",
								msg: "Pindah Kamar berhasil",
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