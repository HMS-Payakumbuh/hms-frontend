import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Ambulans }               from '../layanan/ambulans';
import { AmbulansService }        from '../layanan/ambulans.service';
import { Antrian }                from '../antrian/antrian';
import { AntrianService }         from '../antrian/antrian.service';
import { Dokter }                 from './dokter';
import { Poliklinik }             from '../layanan/poliklinik';
import { PoliklinikService }      from '../layanan/poliklinik.service';
import { Transaksi }              from '../transaksi/transaksi';
import { TransaksiService }       from '../transaksi/transaksi.service';
import { TenagaMedisService }     from './tenaga-medis.service';
import { Tindakan }               from '../layanan/tindakan';
import { TindakanService }        from '../layanan/tindakan.service';

import * as io from "socket.io-client";

@Component({
  selector: 'dokter-dashboard-page',
  templateUrl: './dokter-dashboard.component.html',
  providers: [
    AntrianService,
    AmbulansService,
    PoliklinikService,
    TenagaMedisService,
    TransaksiService,
    TindakanService
  ]
})

export class DokterDashboardComponent implements OnInit {
  dokter: Dokter = null;
  socket: any = null;

  allAmbulans: Ambulans[] = [];
  allAntrian: Antrian[] = [];
  allOnProcessAntrian: Antrian[] = [];
  allProcessedAntrian: Antrian[] = [];
  allPoliklinik: Poliklinik[] = [];

  poliklinikSelected: boolean = false;
  selectedPoliklinik: Poliklinik = new Poliklinik();
  selectedAmbulans: Ambulans = null;
  transaksiRujukan: Transaksi = null;
  transaksiAmbulans: any = null;
  nama_poli: string = null;
  searchKodePasien: string = '';

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "no_antrian";
  public sortOrder = "asc";

  constructor(
    private router: Router,
    private ambulansService: AmbulansService,
    private antrianService: AntrianService,
		private poliklinikService: PoliklinikService,
    private tenagaMedisService: TenagaMedisService,
    private transaksiService: TransaksiService,
    private tindakanService: TindakanService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) {
    this.socket = io('http://localhost')
  }

  ngOnInit() {
    let noPegawai: string = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
    this.tenagaMedisService.getDokter(noPegawai).subscribe(
      dokter => this.dokter = dokter
    );

    this.poliklinikService.getAllPoliklinik().subscribe(
      data => { this.allPoliklinik = data }
    );

    this.ambulansService.getAllAvailableAmbulans().subscribe(
      data => { this.allAmbulans = data }
    );

    this.socket.on(noPegawai, (message) => this.updatePasienRujukan(message));
  }

  onEnter(event) {
    if (event.keyCode == 13)
      this.searchTransaksi();
  }

  searchTransaksi() {
    if (this.searchKodePasien != '') {
      this.transaksiService.getAllTransaksi(this.searchKodePasien, 'open').subscribe(
        data => {
          this.transaksiAmbulans = data
          if (this.transaksiAmbulans.allTransaksi[0] == null) {
            let toastOptions:ToastOptions = {
                title: 'Error',
                msg: 'Kode pasien tidak ditemukan',
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

  pemakaianAmbulans() {
    let tindakan: Tindakan[] = [];
    let temp: Tindakan = new Tindakan();

    temp.id_transaksi = this.transaksiAmbulans.allTransaksi[0].id;
    temp.harga = 50000;
    temp.keterangan = '';
    temp.kode_tindakan = '00.00';
    temp.id_pasien = this.transaksiAmbulans.allTransaksi[0].id_pasien;
    temp.tanggal_waktu = this.transaksiAmbulans.allTransaksi[0].waktu_masuk_pasien;
    temp.np_tenaga_medis = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
    temp.nama_ambulans = this.selectedAmbulans.nama;
    tindakan.push(temp);

    this.tindakanService.saveTindakan(tindakan).subscribe(
      data => {
        this.selectedAmbulans.status = "In Use";
        this.ambulansService.updateAmbulans(this.selectedAmbulans.nama, this.selectedAmbulans).subscribe(
          data => {
            let toastOptions:ToastOptions = {
                title: 'Success',
                msg: 'Pemakaian ambulans berhasil',
                showClose: true,
                timeout: 5000,
                theme: 'material'
            };

            this.toastyService.success(toastOptions);
          }
        )
      }
    )
  }

  showDaftarPasien() {
    this.antrianService.getAllAntrian(this.selectedPoliklinik.nama).subscribe(
      data => {
        this.allAntrian = data;
        this.poliklinikSelected = true;
        this.antrianService.getAntrianWithStatus(this.selectedPoliklinik.nama, 1).subscribe(
          data => {
            this.allOnProcessAntrian = data;
          }
        )
        this.antrianService.getAntrianWithStatus(this.selectedPoliklinik.nama, 2).subscribe(
          data => {
            this.allProcessedAntrian = data;
          }
        )
      }
    )
  }

  prosesAntrian(id_transaksi: number, no_antrian: number) {
    this.antrianService.processAntrian(id_transaksi, no_antrian).subscribe(
      data => {
        this.router.navigate(['/poliklinik', this.selectedPoliklinik.nama, id_transaksi])
      }
    )
  }

  updatePasienRujukan(message: any) {
    if (this.allAntrian.find(antrian => antrian.id_transaksi == message.id_transaksi)) {
      this.showDaftarPasien();
    }
    else {
      this.nama_poli = message.nama_poli;
      this.transaksiService.getTransaksi(message.id_transaksi).subscribe(
        data => this.transaksiRujukan = data
      )
    }
  }
}
