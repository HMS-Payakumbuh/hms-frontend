import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Observable }             from 'rxjs/Observable';
import { NgbTypeaheadConfig }   from '@ng-bootstrap/ng-bootstrap';

import { Pasien }    from './pasien';
import { PasienService }    from './pasien.service';
import { AntrianService }    from '../antrian/antrian.service';
import { Asuransi }  from './asuransi';
import { AsuransiService }  from './asuransi.service';
import { PoliklinikService }    from '../layanan/poliklinik.service';
import { LaboratoriumService }    from '../layanan/laboratorium.service';
import { JadwalDokter }   from '../tenaga-medis/jadwal-dokter';
import { TenagaMedisService}  from '../tenaga-medis/tenaga-medis.service';
import { Rujukan }  from '../transaksi/rujukan';
import { RujukanService }  from '../transaksi/rujukan.service';
import { TransaksiService}  from '../transaksi/transaksi.service';
import { DiagnosisReference }   from '../layanan/diagnosis-reference';
import { DiagnosisService }     from '../layanan/diagnosis.service';

@Component({
  selector: 'pasien-form',
  templateUrl: './pasien-form.component.html',
  providers: [
    DiagnosisService,
    PoliklinikService,
    LaboratoriumService,
    PasienService,
    AntrianService,
    AsuransiService,
    TransaksiService,
    TenagaMedisService,
    RujukanService,
    NgbTypeaheadConfig
  ]
})
export class PasienFormComponent implements OnInit {
	tipe: string;
  layanan: string;
  dokter: string;
	search: string;
  searchDone: boolean;
  update: boolean;
  fromAntrian: boolean = false;
  sub: any;
  asuransi: Asuransi;
  pasien: Pasien;
  rujukan: Rujukan;
  rujukanChecked: boolean;
  asuransiChecked:boolean;
  allAsuransi: Asuransi[];
  allLayanan: any[];
  allPasien: Pasien[] = [];
  allDiagnosisReference: DiagnosisReference[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private diagnosisService: DiagnosisService,
    private poliklinikService: PoliklinikService,
    private laboratoriumService: LaboratoriumService,
    private pasienService: PasienService,
    private antrianService: AntrianService,
    private asuransiService: AsuransiService,
    private transaksiService: TransaksiService,
    private tenagaMedisService: TenagaMedisService,
    private rujukanService: RujukanService,
    private config: NgbTypeaheadConfig,
  ) {
    config.editable = false;
  }

  submitted = false;

  allTipeLayanan = ['Poliklinik', 'Laboratorium'];

  genders = [{id: 1, nama: 'Laki-laki'}, {id: 2, nama: 'Perempuan'}];

  religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  allNamaAsuransi = ['BPJS', 'Bumidaya', 'Prudential', 'AIG'];

  inputFormatter = (value : any) => value.nama;

  resultFormatter = (value : any) => value.kode + ' - ' + value.nama;

  searchDiagnosis = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.allDiagnosisReference.filter(diagnosisReference => diagnosisReference.nama.toLowerCase().indexOf(term.toLowerCase()) > -1));


  ngOnInit() {
    this.pasien = new Pasien();
    this.asuransi = new Asuransi();
    this.rujukan = new Rujukan();

    this.sub = this.route.params
      .subscribe(params => {
        this.layanan = params['namaLayanan'];
    });
    if (this.layanan === undefined) {

    } else {
      this.fromAntrian = true;
      if (this.layanan.indexOf("Poli") >= 0)
          this.tipe = "Poliklinik";
        else
          this.tipe = "Laboratorium";
      this.selectTipeLayanan();
    }

    this.diagnosisService.getAllDiagnosisReference().subscribe(
      data => { this.allDiagnosisReference = data }
    )
  }

  private addDiagnosis(diagnosisReference: DiagnosisReference) {
    this.rujukan.diagnosis = diagnosisReference.nama;
  }

  private searchPasien() {
    if (this.search) {
      if (this.search.match(/\d/)) {
        this.allPasien = [];
        this.pasienService.getPasien(this.search)
          .subscribe(allPasien => {
            if (allPasien) {
              this.allPasien.push(allPasien);
              this.pasien = this.allPasien[0];
              this.selectPasien();
            }
          });
      } else {
         this.pasienService.getPasienByName(this.search)
          .subscribe(allPasien => this.allPasien = allPasien);
      }
    }
  }

  private selectPasien() {
    this.asuransiService.getAsuransi(this.pasien.id).subscribe(allAsuransi => this.allAsuransi = allAsuransi);
    this.searchDone = true;
  }

  private selectTipeLayanan() {
    if (this.tipe === 'Poliklinik') {
      this.poliklinikService.getAllPoliklinik().subscribe(
        data => {
          this.allLayanan = data;
        })
    } else if (this.tipe === 'Laboratorium') {
      this.laboratoriumService.getAllLaboratorium().subscribe(
        data => { this.allLayanan = data }
      )
    }
  }

  private customTrackBy(index: number, obj: any): any {
    return index;
  }

  private pakaiAsuransi(asuransi: Asuransi) {
    this.asuransi.nama_asuransi = asuransi.nama_asuransi;
    this.asuransi.no_kartu = asuransi.no_kartu;
  }

  private createAntrian(id_transaksi: number) {
    let request: any = null;
    if (this.tipe === 'Poliklinik') {
      request = {
        id_transaksi: id_transaksi,
        nama_layanan_poli: this.layanan,
        kesempatan: 3,
        id_pasien: this.pasien.id
      };
    }
    else if (this.tipe === 'Laboratorium') {
      request = {
        id_transaksi: id_transaksi,
        nama_layanan_lab: this.layanan,
        kesempatan: 3,
        id_pasien: this.pasien.id
      };
    }

    this.antrianService.createAntrian(request).subscribe(
      data => {
        if(data.error) {
          alert(data.error);
        } else {
          this.ngOnInit();
        }
      }
    );
  }

  private createRujukan(id_transaksi: number) {
    this.rujukan.id_transaksi = id_transaksi;
    this.rujukanService.createRujukan(this.rujukan).subscribe(
      data => {
          this.createAntrian(id_transaksi);
      }
    );
  }

  private createTransaksi() {
    let kode_jenis_pasien:number = 1;
    let payload: any;
    if (this.asuransiChecked) {
      kode_jenis_pasien = 2;
    }
    if (this.asuransi.nama_asuransi == 'bpjs') {
      payload = {
        id_pasien: this.pasien.id,
        no_sep: Math.random().toString(36).substring(7),
        kode_jenis_pasien: kode_jenis_pasien,
        asuransi_pasien: this.asuransi.nama_asuransi,
        jenis_rawat: 2,
      };
    }
    else {
      payload = {
        id_pasien: this.pasien.id,
        kode_jenis_pasien: kode_jenis_pasien,
        asuransi_pasien: this.asuransi.nama_asuransi,
        jenis_rawat: 2,
      };
    }
    let request: any = {
      transaksi : payload
    }
    this.transaksiService.createTransaksi(request).subscribe(
      data => {
        if (this.rujukanChecked)
          this.createRujukan(data.transaksi.id);
        else
          this.createAntrian(data.transaksi.id);
      }
    );
  }

  private createAsuransi() {
    this.asuransi.id_pasien = this.pasien.id;
    let asuransi:any = { asuransi: this.asuransi };
    this.asuransiService.createAsuransi(asuransi).subscribe(
      data => {this.createTransaksi()}
    );
  }

  private createPasien() {
    if (this.update) {
      this.pasienService.updatePasien(this.pasien.id, this.pasien).subscribe(
        data => {
          this.pasien = data;
          alert('Anda mendapat kode pasien : '+ data.kode_pasien);
          if (this.asuransiChecked)
            this.createAsuransi();
          else
            this.createTransaksi();
        }
      );
    } else {
      this.pasienService.createPasien(this.pasien).subscribe(
        data => {
          this.pasien = data;
          alert('Anda mendapat kode pasien : '+ data.kode_pasien);
          if (this.asuransiChecked)
            this.createAsuransi();
          else
            this.createTransaksi();
        }
      );
    }
  }
}
