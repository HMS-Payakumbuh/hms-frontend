import { Component, OnInit }															from '@angular/core';
import { ActivatedRoute, Params }													from '@angular/router';
import { Location }																				from '@angular/common';
import { Observable }																			from 'rxjs/Observable';
import { NgbTypeaheadConfig } 														from '@ng-bootstrap/ng-bootstrap';

import { Transaksi }						from '../transaksi/transaksi';
import { TransaksiService }			from '../transaksi/transaksi.service';

import { RekamMedis }           from '../pasien/rekam-medis';
import { RekamMedisService }    from '../pasien/rekam-medis.service';
import { HasilPemeriksaan }     from './hasil-pemeriksaan';
import { AntrianService }       from '../antrian/antrian.service';

import { Poliklinik }						from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';
import { LaboratoriumService }  from './laboratorium.service';

import { TenagaMedis }          from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }   from '../tenaga-medis/tenaga-medis.service';

import { JadwalDokter }         from '../tenaga-medis/jadwal-dokter';

import { Diagnosis }            from './diagnosis';
import { DiagnosisReference }		from './diagnosis-reference';
import { DiagnosisService }			from './diagnosis.service';

import { Tindakan }							from './tindakan';
import { TindakanReference }		from './tindakan-reference';
import { TindakanService }			from './tindakan.service';

import { ObatTindakan }         from '../farmasi/obat-tindakan/obat-tindakan';
import { ObatTindakanService }  from '../farmasi/obat-tindakan/obat-tindakan.service';

import { Resep }                from '../farmasi/resep/resep';
import { ResepItem }            from '../farmasi/resep/resep-item';
import { RacikanItem }          from '../farmasi/resep/racikan-item';
import { ResepService }         from '../farmasi/resep/resep.service';

import { JenisObat }            from '../farmasi/jenis-obat/jenis-obat';
import { JenisObatService }     from '../farmasi/jenis-obat/jenis-obat.service';

import { StokObat }	            from '../farmasi/stok-obat/stok-obat';
import { StokObatService }		  from '../farmasi/stok-obat/stok-obat.service';

import { ObatMasuk }	          from '../farmasi/obat-masuk/obat-masuk';
import { ObatMasukService }		  from '../farmasi/obat-masuk/obat-masuk.service';

@Component({
 	selector: 'poliklinik-pemeriksaan-page',
 	templateUrl: './poliklinik-pemeriksaan.component.html',
 	providers: [
    AntrianService,
    PoliklinikService,
    LaboratoriumService,
    RekamMedisService,
    TenagaMedisService,
 		TransaksiService,
 		DiagnosisService,
 		TindakanService,
    ObatTindakanService,
    ResepService,
    JenisObatService,
    StokObatService,
    ObatMasukService,
 		NgbTypeaheadConfig
	]
})

export class PoliklinikPemeriksaanComponent implements OnInit {
	transaksi: any = null;
	poliklinik: Poliklinik;
  jadwalDokter: JadwalDokter;
  rekamMedis: RekamMedis;
  hasilPemeriksaan: HasilPemeriksaan = new HasilPemeriksaan();
  keluhan: string;
  allRiwayat: string[] = [];
  allAlergi: string[] = [];
  riwayatBaru: string;
  alergiBaru: string;
  rujuk: boolean = false;

	allDiagnosisReference: DiagnosisReference[];
	allTindakanReference: TindakanReference[];
  allTenagaMedis: TenagaMedis[];
  allStokObatAtLocation: StokObat[];
  allJenisObat: JenisObat[];

  layanan: any = [];
  tipeLayanan: string = '';
  allTipeLayanan: string[] = ['Poliklinik', 'Laboratorium'];
  namaPoliRujuk: string = null;
  namaLabRujuk: string = null;

	selectedDiagnosis: Diagnosis[] = [];
  selectedDiagnosisReference: DiagnosisReference[] = [];

	selectedTindakan: Tindakan[] = [];
  selectedTindakanReference: TindakanReference[] = [];

  allResep: Resep[] = [];

	inputFormatter = (value : any) => value.nama;
	resultFormatter = (value : any) => value.kode + ' - ' + value.nama;

  inputObatFormatter = (value : StokObat) => value.jenis_obat.merek_obat;
  resultObatFormatter = (value: StokObat)	=> value.jenis_obat.merek_obat  + ' - ' + value.obat_masuk.nomor_batch;

  inputJenisObatFormatter = (value : JenisObat) => value.merek_obat;
  resultJenisObatFormatter = (value: JenisObat)	=> value.merek_obat;

  tenagaMedisFormatter = (value : any) => value.nama + ' - ' + value.jabatan;

	searchTindakan = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allTindakanReference.filter(tindakanReference => tindakanReference.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

	searchDiagnosis = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allDiagnosisReference.filter(diagnosisReference => diagnosisReference.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

  searchTenagaMedis = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.allTenagaMedis.filter(tenagaMedis => tenagaMedis.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));

  searchStokObat = (text$: Observable<string>) =>
		text$
			.debounceTime(200)
			.distinctUntilChanged()
			.map(term => term.length < 2 ? []
				: this.allStokObatAtLocation.filter(stokObat => stokObat.jenis_obat.merek_obat.toLowerCase().indexOf(term.toLowerCase()) > -1));

  searchJenisObat = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.allJenisObat.filter(jenisObat => jenisObat.merek_obat.toLowerCase().indexOf(term.toLowerCase()) > -1));

	constructor(
		private route: ActivatedRoute,
		private location: Location,
    private antrianService: AntrianService,
		private transaksiService: TransaksiService,
    private rekamMedisService: RekamMedisService,
		private poliklinikService: PoliklinikService,
    private laboratoriumService: LaboratoriumService,
    private tenagaMedisService: TenagaMedisService,
		private diagnosisService: DiagnosisService,
		private tindakanService: TindakanService,
    private obatTindakanService: ObatTindakanService,
    private resepService: ResepService,
    private jenisObatService: JenisObatService,
    private obatMasukService: ObatMasukService,
    private stokObatService: StokObatService,
		private config: NgbTypeaheadConfig
	) {
		config.editable = false;
	}

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.poliklinikService.getPoliklinik(params['namaPoliklinik']))
			.subscribe(
        poliklinik => {
          this.poliklinik = poliklinik;
          this.stokObatService.getStokObatByLocation(this.poliklinik.id_lokasi).subscribe(
            allStokObatAtLocation => this.allStokObatAtLocation = allStokObatAtLocation
          )
          this.tenagaMedisService.getAllAvailableJadwalDokter(this.poliklinik.nama).subscribe(
            data => this.jadwalDokter = data
          )
        }
      );

		this.route.params
			.switchMap((params: Params) => this.transaksiService.getTransaksi(params['idTransaksi']))
			.subscribe(transaksi => {
        this.transaksi = transaksi;
        this.rekamMedisService.getRekamMedisOfPasien(transaksi.transaksi.pasien.id, 0)
          .subscribe(rekamMedis => {
            if (rekamMedis != null && rekamMedis.anamnesis != null) {
              let anamnesis: any = JSON.parse(rekamMedis.anamnesis);
              if (anamnesis.riwayat_penyakit)
              this.allRiwayat = anamnesis.riwayat_penyakit.split(',');
              if (anamnesis.alergi)
              this.allAlergi = anamnesis.alergi.split(',');
            }
          });
      });

    this.tenagaMedisService.getAllTenagaMedis().subscribe(
      data => { this.allTenagaMedis = data }
    );

		this.tindakanService.getAllTindakanReference().subscribe(
      data => { this.allTindakanReference = data }
    );

		this.diagnosisService.getAllDiagnosisReference().subscribe(
      data => { this.allDiagnosisReference = data }
    )

    this.jenisObatService.getAllJenisObat().subscribe(
      data => { this.allJenisObat = data }
    )
	}

	addSelectedDiagnosis(diagnosisReference: DiagnosisReference) {
		this.selectedDiagnosisReference.push(diagnosisReference);

    let temp = new Diagnosis();
    temp.id_pasien = this.transaksi.transaksi.id_pasien;
    temp.tanggal_waktu = '';
    temp.kode_diagnosis = diagnosisReference.kode;
    this.selectedDiagnosis.push(temp);
	}

	removeSelectedDiagnosis(i: number) {
		this.selectedDiagnosis.splice(i, 1);
    this.selectedDiagnosisReference.splice(i, 1);
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
    temp.tanggal_waktu = null;
    temp.np_tenaga_medis = this.jadwalDokter.np_dokter;
    temp.nama_poli = this.poliklinik.nama;
    temp.nama_lab = null;
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

  addSelectedStokObat(obatTindakan: ObatTindakan, stokObat: StokObat) {
    obatTindakan.stokObat = stokObat;
    obatTindakan.id_jenis_obat = stokObat.id_jenis_obat;
    obatTindakan.id_obat_masuk = stokObat.id_obat_masuk;
  }

  addObatTindakanForm(tindakan: Tindakan) {
    let obatTindakan = new ObatTindakan();
    obatTindakan.id_transaksi = this.transaksi.transaksi.id;
    obatTindakan.asal = this.poliklinik.id_lokasi;
    tindakan.obat_tindakan.push(obatTindakan);
  }

  removeObatTindakanForm(i: number, tindakan: Tindakan) {
    tindakan.obat_tindakan.splice(i, 1);
  }

  addResep() {
    let resep = new Resep();
    resep.id_transaksi = this.transaksi.transaksi.id;
    this.allResep.push(resep);
  }

  removeResep(i: number) {
    this.allResep.splice(i, 1);
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

  setRujuk(value: boolean) {
    this.rujuk = value;
  }

  selectTipeLayanan() {
    this.namaPoliRujuk = null;
    this.namaLabRujuk = null;
    if (this.tipeLayanan === 'Poliklinik') {
      this.poliklinikService.getAllPoliklinik().subscribe(
        data => { this.layanan = data }
      )
    }
    else if (this.tipeLayanan === 'Laboratorium') {
      this.laboratoriumService.getAllLaboratorium().subscribe(
        data => { this.layanan = data }
      )
    }
  }

  addRiwayat() {
    this.allRiwayat.push(this.riwayatBaru);
    this.riwayatBaru = '';
  }

  removeRiwayat(i: number) {
    this.allRiwayat.splice(i, 1);
  }

  addAlergi() {
    this.allAlergi.push(this.alergiBaru);
    this.alergiBaru = '';
  }

  removeAlergi(i: number) {
    this.allAlergi.splice(i, 1);
  }

  goBack(): void {
    this.location.back();
  }

  saveObatTindakan(data: Tindakan[]) {
    let observables = [];
    let i = 0;

    for (let tindakan of this.selectedTindakan) {
      for (let obatTindakan of tindakan.obat_tindakan) {
        obatTindakan.id_tindakan = data[i].id;
      }
      observables.push(
        this.obatTindakanService.createObatTindakan(tindakan.obat_tindakan)
      )
      i++;
    }

    if (this.rujuk) {
      let antrian: any = {};
      antrian.id_transaksi = this.transaksi.transaksi.id;
      antrian.nama_layanan_poli = this.namaPoliRujuk;
      antrian.nama_layanan_lab = this.namaLabRujuk;
      antrian.kesempatan = 3;
      observables.push(this.antrianService.createAntrian(antrian));
    }

    Observable.forkJoin(observables).subscribe(
      data => {
        this.saveResep();
      }
    )
  }

  saveResep() {
    this.resepService.createResep(this.allResep).subscribe(
      data => {
        this.goBack();
      }
    )
  }

	save() {
    let anamnesis: any = {
      keluhan: this.keluhan,
      riwayat_penyakit: this.allRiwayat.toString(),
      alergi: this.allAlergi.toString()
    };

    let rekamMedis: RekamMedis = new RekamMedis(
      this.transaksi.transaksi.id_pasien,
      '',
      this.jadwalDokter.np_dokter,
      JSON.stringify(this.hasilPemeriksaan),
      JSON.stringify(anamnesis),
      '',
      ''
    );

    this.rekamMedisService.createRekamMedis(rekamMedis).subscribe(
      data1 => {
        this.rekamMedis = data1;
        for (let tindakan of this.selectedTindakan) {
          tindakan.tanggal_waktu = this.rekamMedis.tanggal_waktu.date;
        }
        for (let diagnosis of this.selectedDiagnosis) {
          diagnosis.tanggal_waktu = this.rekamMedis.tanggal_waktu.date;
        }

        if (this.selectedDiagnosis.length > 0) {
          this.diagnosisService.saveDiagnosis(this.selectedDiagnosis).subscribe(
            data2 => {
              this.tindakanService.saveTindakan(this.selectedTindakan).subscribe(
                data3 => {
                  this.saveObatTindakan(data3);
                }
              );
            }
          );
        }
        else {
          this.tindakanService.saveTindakan(this.selectedTindakan).subscribe(
            data3 => {
              this.saveObatTindakan(data3);
            }
          );
        }
      }
    )
	}
}
