import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Observable } from 'rxjs/Rx';

import { Antrian }                from './antrian';
import { AntrianService }         from './antrian.service';
import { LaboratoriumService }    from '../layanan/laboratorium.service';
import { PoliklinikService }      from '../layanan/poliklinik.service';
import { Transaksi }              from '../transaksi/transaksi';
import { Dokter }                 from '../tenaga-medis/dokter';
import { TransaksiService }       from '../transaksi/transaksi.service'
import { TenagaMedisService }     from '../tenaga-medis/tenaga-medis.service';
import { User }                   from '../auth/user';
import { AuthenticationService }  from '../auth/authentication.service';
import { RekamMedis }             from '../pasien/rekam-medis';
import { RekamMedisService }      from '../pasien/rekam-medis.service';
import { HasilPemeriksaan }       from '../layanan/hasil-pemeriksaan';

import * as _ from "lodash";
import * as io from "socket.io-client";

@Component({
  selector: 'antrian',
  templateUrl: './antrian.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    AntrianService,
    AuthenticationService,
    PoliklinikService,
    LaboratoriumService,
    TransaksiService,
    TenagaMedisService,
    RekamMedisService
  ]
})
export class AntrianComponent implements OnInit, OnDestroy {
  allKategori: any[] = [];
  allAntrian: any[];
  allAntrianSMS: any[] = [];
  observable: any;
  kategori: string;
  selectedKategori: string;
  total: number = 0;
  antrian: any = { no_antrian: null };
  umum: boolean = true;
  antrianEmpty: boolean;
  isfrontoffice: boolean;
  isPoli: boolean;
  sub: any;
  layanan: string;
  socket: any = null;
  user: any;

  searchTransaksiRujukanTerm: string = '';
  transaksiRujukan: any = null;
  allDokter: Dokter[] = [];
  selectedDokter: Dokter = null;
  idTransaksi: number = null;
  isRujukan: boolean = false;

  newRekamMedis: boolean = false;
  hasilPemeriksaan: HasilPemeriksaan = new HasilPemeriksaan();

  public filterQuery = "";
  public rowsOnPage = 4;
  public sortByRujukan = "no_transaksi";
  public sortBySMS = "waktu_perjanjian";
  public sortOrder = "asc";

  constructor(
    private route: ActivatedRoute,
    private antrianService : AntrianService,
    private authenticationService: AuthenticationService,
    private poliklinikService: PoliklinikService,
    private laboratoriumService: LaboratoriumService,
    private transaksiService: TransaksiService,
    private tenagaMedisService: TenagaMedisService,
    private rekamMedisService: RekamMedisService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.socket = io('http://localhost');
  }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.layanan = params['namaLayanan'];
    });
    if (this.layanan === undefined) {
      this.layanan = 'Front Office';
      this.updateKategori();
      this.isfrontoffice = true;
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.kategori = JSON.parse(this.user.other).kategori_antrian;
      this.selectedKategori = this.kategori;
      this.socket.on('antrianFrontOffice'+this.kategori, this.updateAntrianFrontOffice.bind(this));
      this.updateAntrianFrontOffice();
      this.observable = Observable.interval(2000 * 60).subscribe(x => {
          this.antrianService.updateAntrianSMS().subscribe(data => {});
        });
    }
    else {
      this.updateAntrian();
      this.isfrontoffice = false;
      if (this.layanan.substring(0, 4) === 'Poli') {
        this.isPoli = true;
        this.tenagaMedisService.getAllDokterOfSpesialis(this.layanan.substring(5)).subscribe(
          data => this.allDokter = data
        )
      }
      else
        this.isPoli = false;
      this.socket.on('antrianLayanan'+this.layanan, this.updateAntrian.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.layanan === undefined) {
      this.observable.unsubscribe();
    }
  }

  private updateKategori() {
    this.poliklinikService.getAllPoliklinik().subscribe(
      data => {
        for(let dat of data) {
          this.allKategori.push(_.pick(dat, ['nama', 'kategori_antrian', 'created_at', 'updated_at']));
        }
        this.laboratoriumService.getAllLaboratorium().subscribe(
          data => {
            this.allKategori = _.sortBy(_.unionBy(this.allKategori, data, 'kategori_antrian'), 'kategori_antrian');
          });
      }
    );
  }

  private updateAntrianSMS() {
    this.antrianService.getAntrianSMSFrontOffice(this.kategori)
      .subscribe(allAntrian => {
        this.allAntrianSMS = allAntrian;
      });
  }

  private updateAntrian() {
    this.route.params
        .switchMap((params: Params) => this.antrianService.getAntrian(params['namaLayanan']))
        .subscribe(allAntrian => {
          this.allAntrian = allAntrian;
          this.total = allAntrian.length;
          this.antrian = this.nextAntrian(this.umum);
          if (!this.antrian)
            this.antrian = this.nextAntrian(!this.umum);
          else
            this.umum = !this.umum;
          if (allAntrian.length == 0) {
            this.antrianEmpty = true;
          } else {
            this.antrianEmpty = false;
          }
        });
  }

  private updateAntrianFrontOffice() {
    this.antrianService.getAntrianFrontOffice(this.kategori)
      .subscribe(allAntrian => {
        this.allAntrian = allAntrian;
        this.total = allAntrian.length;
        this.antrian = this.nextAntrian(this.umum);
        if (!this.antrian)
          this.antrian = this.nextAntrian(!this.umum);
        else
          this.umum = !this.umum;
        if (allAntrian.length == 0) {
          this.antrianEmpty = true;
        } else {
          this.antrianEmpty = false;
        }
      });
  }

  private proses(jenis:string) {
    if (jenis === 'undur') {
      if (this.isfrontoffice) {
        this.antrianService.updateAntrianFrontOffice(this.antrian.nama_layanan, this.antrian.no_antrian).subscribe(data => {
          this.updateAntrianFrontOffice();
        });
      } else {
        this.antrianService.updateAntrian(this.antrian.id_transaksi, this.antrian.no_antrian).subscribe(data => {
          this.updateAntrian();
        });
      }
    } else {
      if (this.isfrontoffice) {
        this.antrianService.destroyAntrianFrontOffice(this.antrian.nama_layanan, this.antrian.no_antrian).subscribe(data => {
          this.updateAntrianFrontOffice();
        });
      } else {
        this.antrianService.destroyAntrian(this.antrian.id_transaksi, this.antrian.no_antrian).subscribe(data => {
          this.updateAntrian();
        });
      }
    }
  }

  private nextAntrian(umum: boolean) {
    if (umum) {
      return _.find(this.allAntrian, {jenis: 1}) ? _.find(this.allAntrian, {jenis: 1}): null;
    } else {
      return _.find(this.allAntrian, {jenis: 0}) ? _.find(this.allAntrian, {jenis: 0}): null;
    }
  }

  private changeKategori() {
    this.socket.on('antrianFrontOffice'+this.kategori, this.updateAntrianFrontOffice.bind(this));
    this.updateAntrianFrontOffice();
  }

  private setKategori() {
    this.authenticationService.setKategori(this.user.no_pegawai, this.kategori);
    setTimeout(() =>
    {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.kategori = JSON.parse(this.user.other).kategori_antrian;
      this.selectedKategori = this.kategori;
      this.updateAntrianFrontOffice();
    },
    2000);
  }

  private onEnter(event) {
    if (event.keyCode == 13) {
      this.searchTransaksiRujukan();
    }
  }

  private searchTransaksiRujukan() {
    if (this.searchTransaksiRujukanTerm != '') {
      this.transaksiService.getAllTransaksi(this.searchTransaksiRujukanTerm, null, 'open').subscribe(
        data => {
          this.transaksiRujukan = data;
          if (this.transaksiRujukan.allTransaksi.length == 0) {
            this.transaksiRujukan = null;
            let toastOptions:ToastOptions = {
                title: 'Error',
                msg: 'Kode Pasien tidak ditemukan',
                showClose: true,
                timeout: 5000,
                theme: 'material'
            };

            this.toastyService.error(toastOptions);
          }
        }
      )
    }
  }

  private setIdTransaksi(id: number) {
    this.idTransaksi = id;
    this.isRujukan = true;
  }

  private setRujukan(value: boolean) {
    this.idTransaksi = this.antrian.id_transaksi;
    this.isRujukan = value;
  }

  private checkHasilPemeriksaan() {
    if (this.hasilPemeriksaan.berat_badan == '' || parseInt(this.hasilPemeriksaan.berat_badan) <= 0 || parseInt(this.hasilPemeriksaan.berat_badan) > 300) {
      return false;
    }

    if (this.hasilPemeriksaan.tinggi_badan == '' || parseInt(this.hasilPemeriksaan.tinggi_badan) <= 0 || parseInt(this.hasilPemeriksaan.nadi) > 300) {
      return false;
    }

    if (this.hasilPemeriksaan.frekuensi_napas == '' || parseInt(this.hasilPemeriksaan.frekuensi_napas) <= 0 || parseInt(this.hasilPemeriksaan.frekuensi_napas) > 150) {
      return false;
    }

    if (this.hasilPemeriksaan.nadi == '' || parseInt(this.hasilPemeriksaan.nadi) <= 0 || parseInt(this.hasilPemeriksaan.nadi) > 150) {
      return false;
    }

    if (this.hasilPemeriksaan.temperatur == '' || parseInt(this.hasilPemeriksaan.temperatur) <= 0 || parseInt(this.hasilPemeriksaan.temperatur) > 45) {
      return false;
    }

    if (this.hasilPemeriksaan.tekanan_darah == '')
      return false;

    return true;
  }

  private periksa(no_pegawai, nama_poli, id_transaksi) {
    if (this.checkHasilPemeriksaan()) {
      if (!this.isRujukan) {
        this.proses('proses');
  
        let rekamMedis = new RekamMedis(
          this.antrian.transaksi.id_pasien,
          this.antrian.transaksi.waktu_masuk_pasien,
          '',
          JSON.stringify(this.hasilPemeriksaan),
          '',
          '',
          ''
        );
        this.rekamMedisService.createRekamMedis(rekamMedis).subscribe(
          data => {
            let request = {
              no_pegawai: no_pegawai,
              nama_poli: nama_poli,
              id_transaksi: id_transaksi
            }
            this.tenagaMedisService.periksa(request).subscribe(
              data => {
                let toastOptions:ToastOptions = {
                    title: "Success",
                    msg: "Pasien sudah diteruskan ke " + nama_poli,
                    showClose: true,
                    timeout: 5000,
                    theme: 'material'
                };
  
                this.toastyService.success(toastOptions);
              }
            )
          }
        );
      }
      else {
        let request = {
          no_pegawai: no_pegawai,
          nama_poli: nama_poli,
          id_transaksi: id_transaksi
        }
        this.tenagaMedisService.periksa(request).subscribe(
          data => {
            let toastOptions:ToastOptions = {
                title: "Success",
                msg: "Pasien sudah diteruskan ke " + nama_poli,
                showClose: true,
                timeout: 5000,
                theme: 'material'
            };
  
            this.toastyService.success(toastOptions);
          }
        )
      }
    }
    else {
      let toastOptions:ToastOptions = {
        title: 'Error',
        msg: 'Hasil pemeriksaan awal kosong atau tidak tepat',
        showClose: true,
        timeout: 5000,
        theme: 'material'
      };

      this.toastyService.error(toastOptions);
    }
  }
}
