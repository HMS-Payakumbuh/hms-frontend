import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import { NgbTypeaheadConfig }   from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Pasien }    from './pasien';
import { PasienService }    from './pasien.service';
import { Asuransi }  from './asuransi';
import { AsuransiService }  from './asuransi.service';
import { Rujukan }  from '../transaksi/rujukan';
import { RujukanService }  from '../transaksi/rujukan.service';
import { TransaksiService}  from '../transaksi/transaksi.service';
import { DiagnosisReference }   from '../layanan/diagnosis-reference';
import { DiagnosisService }     from '../layanan/diagnosis.service';

@Component({
  selector: 'pasien-form',
  templateUrl: './pasien-igd-form.component.html',
  providers: [
    DiagnosisService,
    PasienService,
    AsuransiService,
    TransaksiService,
    RujukanService,
    NgbTypeaheadConfig
  ]
})
export class PasienIGDFormComponent implements OnInit {
	tipe: string;
	search: string;
  searchDone: boolean;
  update: boolean;
  fromAntrian: boolean = false;
  sub: any;
  asuransi: Asuransi;
  pasien: Pasien = new Pasien();
  rujukan: Rujukan;
  rujukanChecked: boolean;
  asuransiChecked:boolean;
  allAsuransi: Asuransi[];
  allPasien: Pasien[] = [];
  allDiagnosisReference: DiagnosisReference[];

  constructor(
    private router: Router,
    private diagnosisService: DiagnosisService,
    private pasienService: PasienService,
    private asuransiService: AsuransiService,
    private transaksiService: TransaksiService,
    private rujukanService: RujukanService,
    private config: NgbTypeaheadConfig,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    config.editable = false;
  }

  submitted = false;
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
    this.rujukanChecked = false;
    this.asuransiChecked = false;
    this.searchDone = false;

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

  private customTrackBy(index: number, obj: any): any {
    return index;
  }

  private pakaiAsuransi(asuransi: Asuransi) {
    this.asuransi.nama_asuransi = asuransi.nama_asuransi;
    this.asuransi.no_kartu = asuransi.no_kartu;
  }

  private createRujukan(id_transaksi: number) {
    this.rujukan.id_transaksi = id_transaksi;
    this.rujukanService.createRujukan(this.rujukan).subscribe(
      data => this.router.navigate(['/poliklinik', 'IGD', id_transaksi])
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
          this.router.navigate(['/poliklinik', 'IGD', data.transaksi.id])
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
          let toastOptions: ToastOptions = {
              title: 'Pendaftaran IGD Sukses',
              msg: 'Anda mendapat kode pasien: ' + data.kode_pasien,
              showClose: true,
              timeout: 5000,
              theme: 'bootstrap'
          };
          this.toastyService.success(toastOptions);

          if (this.asuransiChecked)
            this.createAsuransi();
          else
            this.createTransaksi();
        }
      );
    } else {
      this.pasienService.createPasien(this.pasien).subscribe(
        data => {
          this.pasien = data.json;
          let toastOptions: ToastOptions = {
              title: 'Pendaftaran IGD Sukses',
              msg: 'Anda mendapat kode pasien: ' + data.json.kode_pasien,
              showClose: true,
              timeout: 5000,
              theme: 'bootstrap'
          };
          this.toastyService.success(toastOptions);

          if (this.asuransiChecked)
            this.createAsuransi();
          else
            this.createTransaksi();
        }
      );
    }
  }
}
