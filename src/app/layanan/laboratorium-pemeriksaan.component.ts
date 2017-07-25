import { Component, OnInit }															from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators }	from '@angular/forms';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';

import { RekamMedis }           from '../pasien/rekam-medis';
import { RekamMedisService }    from '../pasien/rekam-medis.service';

import { TenagaMedis }          from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }   from '../tenaga-medis/tenaga-medis.service';

import { Laboratorium }						from './laboratorium';
import { LaboratoriumService }		from './laboratorium.service';

import { Tindakan }             from './tindakan';
import { TindakanReference }		from './tindakan-reference';
import { TindakanService }			from './tindakan.service';

import { HasilLab }             from './hasil-lab';
import { HasilLabService }      from './hasil-lab.service';

@Component({
 	selector: 'laboratorium-pemeriksaan-page',
 	templateUrl: './laboratorium-pemeriksaan.component.html',
 	providers: [
    RekamMedisService,
    LaboratoriumService,
 		TransaksiService,
    TenagaMedisService,
 		TindakanService,
    HasilLabService
	]
})

export class LaboratoriumPemeriksaanComponent implements OnInit {

	addForm: FormGroup;
	transaksi: any = null;
	laboratorium: Laboratorium;
  rekamMedis: RekamMedis = null;

  allRiwayat: string[] = [];
  allAlergi: string[] = [];

	allTindakanReference: TindakanReference[];
  allTenagaMedis: TenagaMedis[];

	selectedTindakan: Tindakan[] = [];
  selectedTindakanReference: TindakanReference[] = [];

	inputFormatter = (value : any) => value.nama;
	resultFormatter = (value : any) => value.kode + ' - ' + value.nama;
  tenagaMedisFormatter = (value : any) => value.nama + ' - ' + value.jabatan;

	searchTindakan = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allTindakanReference.filter(tindakanReference => tindakanReference.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

  searchTenagaMedis = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.allTenagaMedis.filter(tenagaMedis => tenagaMedis.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private formBuilder: FormBuilder,
		private transaksiService: TransaksiService,
    private rekamMedisService: RekamMedisService,
    private tenagaMedisService: TenagaMedisService,
		private laboratoriumService: LaboratoriumService,
		private tindakanService: TindakanService,
    private hasilLabService: HasilLabService,
		private config: NgbTypeaheadConfig
	) {
		config.editable = false;
	}

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.laboratoriumService.getLaboratorium(params['namaLaboratorium']))
			.subscribe(laboratorium => this.laboratorium = laboratorium);

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(+params['idTransaksi']))
			.subscribe(
        transaksi => {
          this.transaksi = transaksi;
          this.checkRekamMedis();
        }
      );

    this.tenagaMedisService.getAllTenagaMedis().subscribe(
      data => { this.allTenagaMedis = data }
    )

    this.tindakanService.getAllTindakanReference().subscribe(
      data => { this.allTindakanReference = data }
    );
	}

  checkRekamMedis() {
    this.rekamMedisService.getRekamMedisOfPasien(this.transaksi.transaksi.id_pasien, 0).subscribe(
      data => {
        if (data != null) {
          if (data.tanggal_waktu == this.transaksi.transaksi.waktu_masuk_pasien) {
            this.rekamMedis = data;
          }
          else {
            if (data.anamnesis != null) {
              this.rekamMedis = new RekamMedis(
                this.transaksi.transaksi.id_pasien,
                this.transaksi.transaksi.waktu_masuk_pasien,
                'D001',
                '',
                data.anamnesis,
                '',
                ''
              );

              this.rekamMedisService.createRekamMedis(this.rekamMedis).subscribe(
                data => {}
              );
            }
          }
        }

        if (this.rekamMedis == null) {
          this.rekamMedis = new RekamMedis(
            this.transaksi.transaksi.id_pasien,
            this.transaksi.transaksi.waktu_masuk_pasien,
            'D001',
            '',
            '',
            '',
            ''
          );

          this.rekamMedisService.createRekamMedis(this.rekamMedis).subscribe(
            data => {}
          );
        }
      }
    )
  }

	addSelectedTindakan(tindakanReference: TindakanReference) {
		this.selectedTindakanReference.push(tindakanReference);

    let temp = new Tindakan();
    temp.id_transaksi = this.transaksi.transaksi.id;
    temp.harga = tindakanReference.harga;
    temp.keterangan = '';
    temp.id_pembayaran = null;
    temp.kode_tindakan = tindakanReference.kode;
    temp.id_pasien = this.transaksi.transaksi.id_pasien;
    temp.tanggal_waktu = this.rekamMedis.tanggal_waktu;
    temp.np_tenaga_medis = 'D001';
    temp.nama_poli = null;
    temp.nama_lab = this.laboratorium.nama;
    temp.nama_ambulans = null;
    this.selectedTindakan.push(temp);
	}

	removeSelectedTindakan(i: number) {
    this.selectedTindakan.splice(i, 1);
		this.selectedTindakanReference.splice(i, 1);
	}

  selectTenagaMedis(tindakan: Tindakan, tenagaMedis: TenagaMedis) {
    tindakan.np_tenaga_medis = tenagaMedis.no_pegawai;
  }

	goBack(): void {
		this.location.back();
	}

  save() {
		this.tindakanService.saveTindakan(this.selectedTindakan).subscribe(
      data => {
        let observables = [];
        for (let tindakan of data) {
          let hasilLab: HasilLab = new HasilLab();
          hasilLab.id_transaksi = this.transaksi.transaksi.id;
          hasilLab.id_tindakan = tindakan.id;
          observables.push(this.hasilLabService.createHasilLab(hasilLab));
        }

        Observable.forkJoin(observables).subscribe(
          data => this.goBack()
        )
      }
    );
	}
}
