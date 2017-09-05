import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { DatePipe } from '@angular/common';
import { Observable }             from 'rxjs/Observable';
import { NgbTypeaheadConfig }   from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Pasien }    from './pasien';
import { PasienService }    from './pasien.service';
import { RekamMedisService } from './rekam-medis.service';
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
    RekamMedisService,
    NgbTypeaheadConfig
  ]
})
export class PasienFormComponent implements OnInit {
	tipe: string;
  layanan: string;
  dokter: string;
	search: string;
  no_antrian: number;
  searchDone: boolean;
  update: boolean;
  isBpjs: boolean = false;
  isBpjsVerified: boolean = true;
  isVerified: boolean;
  nomor_pasien: string;
  no_sep: string;
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
  currentUser: any;
  datePipe: any = new DatePipe('id');

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
    private rekamMedisService: RekamMedisService,
    private config: NgbTypeaheadConfig,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    config.editable = false;
  }

  submitted = false;

  allTipeLayanan = ['Poliklinik', 'Laboratorium'];

  genders = [{id: 1, nama: 'Laki-laki'}, {id: 2, nama: 'Perempuan'}];

  religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  allNamaAsuransi = ['bpjs', 'bumidaya', 'prudential', 'aig'];

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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

    this.sub = this.route.params
      .subscribe(params => {
        this.layanan = params['namaLayanan'];
    });
    if (this.layanan === undefined) {
      if (this.currentUser.role == 'petugasLab') {
        this.tipe = 'Laboratorium';
        this.selectTipeLayanan();
      }
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
    this.pasien.tanggal_lahir = this.datePipe.transform(this.pasien.tanggal_lahir, 'dd-MM-yyyy');
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
    this.cekAsuransi();
  }

  private getRujukan() {
    this.transaksiService.getRujukan(this.rujukan.no_rujukan).subscribe(data => {
        if (data.metadata.code == '200') {
          this.isVerified = true;
          this.rujukan.diagnosis = data.data_rujukan.response.item.diagnosa.kdDiag + '-' +  data.data_rujukan.response.item.diagnosa.nmDiag;
          this.nomor_pasien = data.data_rujukan.response.item.peserta.noKartu;
          this.rujukan.asal_rujukan = data.data_rujukan.response.item.provKunjungan.nmProvider;
          this.rujukan.keterangan = data.data_rujukan.response.item.catatan;
          this.no_sep = data.response;

          let toastOptions:ToastOptions = {
              title: "Verifikasi Berhasil !",
              msg: "Nomor rujukan yang dimasukkan sudah valid.",
              showClose: true,
              timeout: 5000,
              theme: 'material'
          };

          this.toastyService.success(toastOptions);

          if (this.isBpjs) {
            if (this.asuransi.no_kartu != this.nomor_pasien) {
              let toastOptions:ToastOptions = {
                title: "Verifikasi Gagal !",
                msg: "Nomor kartu bpjs yang dimasukkan tidak valid.",
                showClose: true,
                timeout: 5000,
                theme: 'material'
              };

              this.toastyService.error(toastOptions);
              this.isBpjsVerified = false;
            } else {
              this.isBpjsVerified = true;
            }
          }
        } else {
          this.isVerified = false;
          let toastOptions:ToastOptions = {
              title: "Verifikasi Gagal !",
              msg: "Nomor rujukan yang dimasukkan tidak valid.",
              showClose: true,
              timeout: 5000,
              theme: 'material'
          };

          this.toastyService.error(toastOptions);
        }
      });
  }

  private cekBpjs() {
    if (this.asuransi.no_kartu != this.nomor_pasien) {
      let toastOptions:ToastOptions = {
        title: "Verifikasi Gagal !",
        msg: "Nomor kartu bpjs yang dimasukkan tidak valid.",
        showClose: true,
        timeout: 5000,
        theme: 'material'
      };

      this.toastyService.error(toastOptions);
      this.isBpjsVerified = false;
    } else {
      let toastOptions:ToastOptions = {
          title: "Verifikasi Berhasil !",
          msg: "Nomor kartu bpjs yang dimasukkan sudah valid.",
          showClose: true,
          timeout: 5000,
          theme: 'material'
      };

      this.toastyService.success(toastOptions);
      this.isBpjsVerified = true;
    }
  }

  private cekAsuransi() {
    if (this.asuransi.nama_asuransi === 'bpjs') {
      this.rujukanChecked = true;
      this.isBpjs = true;
    } else {
      this.isBpjs = false;
    }
  }

  private print(): void {
      let printContents, popupWin;
      printContents = document.getElementById('invoice').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
      popupWin.document.open();
      popupWin.document.write(`
      <html>
        <head>
        <title>Informasi Registrasi</title>
        <script src="node_modules/core-js/client/shim.min.js"></script>

        <script src="node_modules/zone.js/dist/zone.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <script src="https://cdn.socket.io/socket.io-1.3.4.js"></script>

        <script src="systemjs.config.js"></script>
        <script>
          System.import('main.js').catch(function(err){ console.error(err); });
        </script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="styles.css">
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
      popupWin.document.close();
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
          let toastOptions:ToastOptions = {
              title: "Pendaftaran Antrian Gagal !",
              msg: data.error,
              showClose: true,
              timeout: 5000,
              theme: 'material'
          };

          this.toastyService.error(toastOptions);
        } else {
          this.no_antrian = data.no_antrian;
          let nama_layanan:string;
          if (data.nama_layanan_poli)
            nama_layanan = data.nama_layanan_poli;
          else if (data.nama_layanan_lab)
            nama_layanan = data.nama_layanan_lab;

          let toastOptions:ToastOptions = {
              title: "Pendaftaran Antrian Sukses !",
              msg: "Pasien mendaftar ke "+nama_layanan+" dan mendapat nomor antrian "+data.no_antrian,
              showClose: true,
              timeout: 0,
              theme: 'material'
          };

          this.toastyService.success(toastOptions);
          setTimeout(() => this.print(), 1000);
          setTimeout(() => this.ngOnInit(), 1000);
        }
      }
    );
  }

  private createRujukan(id_transaksi: number) {
    this.rujukan.id_transaksi = id_transaksi;
    this.rujukanService.createRujukan(this.rujukan).subscribe(
      data => {
        if (this.isBpjs) {
          this.rekamMedisService.importRekamMedisEksternal(this.nomor_pasien, this.rujukan.no_rujukan)
            .subscribe(data => {
              if (data.status == 200) {
                let rekamMedis: any = {};
                rekamMedis.kode_pasien = this.nomor_pasien;
                rekamMedis.id_pasien = this.pasien.id;
                let dokumen: any = data.json;
                rekamMedis.identitas_pasien = JSON.stringify(dokumen.ClinicalDocument.recordTarget.patientRole.patient);
                rekamMedis.identitas_dokter = JSON.stringify(dokumen.ClinicalDocument.author);
                rekamMedis.komponen = JSON.stringify(dokumen.ClinicalDocument.component.structuredBody.component);
                this.rekamMedisService.createRekamMedisEksternal(rekamMedis).subscribe(data => {
                    let toastOptions:ToastOptions = {
                      title: "Pengambilan Rekam Medis Berhasil !",
                      msg: "Rekam medis sudah disimpan dan siap digunakan.",
                      showClose: true,
                      timeout: 5000,
                      theme: 'material'
                    };

                    this.toastyService.success(toastOptions);
                  });
              } else if (data.status == 202){
                let toastOptions:ToastOptions = {
                    title: "Pengambilan Rekam Medis Gagal !",
                    msg: data.json,
                    showClose: true,
                    timeout: 5000,
                    theme: 'material'
                };

                this.toastyService.error(toastOptions);
              }
            });
        }
          
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
        no_sep: this.no_sep,
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
    if (this.rujukanChecked)
      payload.rujukan = true;
    else
      payload.rujukan = false;

    let request: any = {
      transaksi : payload
    }
    this.transaksiService.createTransaksi(request).subscribe(
      data => {
        if (data.code === 500) {
          let toastOptions:ToastOptions = {
            title: "Pendaftaran Antrian Gagal !",
            msg: data.message,
            showClose: true,
            timeout: 5000,
            theme: 'material'
          };

          this.toastyService.error(toastOptions);
        } else {
          if (this.rujukanChecked)
            this.createRujukan(data.transaksi.id);
          else
            this.createAntrian(data.transaksi.id);
        }
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
    if (this.asuransi.nama_asuransi === 'bpjs' && !this.rujukanChecked) {
      let toastOptions:ToastOptions = {
          title: "Registrasi Pasien Gagal !",
          msg: "Pasien BPJS harus memasukkan nomor rujukan.",
          showClose: true,
          timeout: 5000,
          theme: 'material'
      };

      this.toastyService.error(toastOptions);
    } else if (!this.isBpjsVerified) {
      let toastOptions:ToastOptions = {
          title: "Registrasi Pasien Gagal !",
          msg: "Nomor bpjs masih belum valid.",
          showClose: true,
          timeout: 5000,
          theme: 'material'
      };

      this.toastyService.error(toastOptions);
    } else {
      if (this.update) {
        this.pasienService.updatePasien(this.pasien.id, this.pasien).subscribe(
          data => {
            if (data.status === 202) {
              let toastOptions:ToastOptions = {
                title: "Registrasi Pasien Gagal !",
                msg: data.json.error,
                showClose: true,
                timeout: 5000,
                theme: 'material'
              };

              this.toastyService.error(toastOptions);
            } else {
              this.pasien = data.json;
              if (this.asuransiChecked)
                this.createAsuransi();
              else
                this.createTransaksi();
            }
          }
        );
      } else {
        this.pasienService.createPasien(this.pasien).subscribe(
          data => {
            this.pasien = data.json;

            if (data.status === 201) {
              let toastOptions:ToastOptions = {
                title: "Registrasi Pasien Sukses !",
                msg: "Pasien mendapat nomor pasien : "+data.json.kode_pasien,
                showClose: true,
                timeout: 0,
                theme: 'material'
              };

              this.toastyService.success(toastOptions);
            }
            if (data.status === 202) {
              let toastOptions:ToastOptions = {
                title: "Registrasi Pasien Gagal !",
                msg: data.json.error,
                showClose: true,
                timeout: 5000,
                theme: 'material'
              };

              this.toastyService.error(toastOptions);
            } else {
              if (this.asuransiChecked)
                this.createAsuransi();
              else
                this.createTransaksi();
            }
          }
        );
      }
    }
  }
}
