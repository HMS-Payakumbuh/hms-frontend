import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Ambulans }               from '../layanan/ambulans';
import { AmbulansService }        from '../layanan/ambulans.service';
import { Poliklinik }             from '../layanan/poliklinik';
import { PoliklinikService }      from '../layanan/poliklinik.service';
import { TransaksiService }       from '../transaksi/transaksi.service';
import { Tindakan }               from '../layanan/tindakan';
import { TindakanService }        from '../layanan/tindakan.service';

import * as io from "socket.io-client";

@Component({
  selector: 'perawat-dashboard-page',
  templateUrl: './perawat-dashboard.component.html',
  providers: [
    AmbulansService,
    PoliklinikService,
    TransaksiService,
    TindakanService
  ]
})

export class PerawatDashboardComponent implements OnInit {
  socket: any = null;

  allAmbulans: Ambulans[] = [];
  allPoliklinik: Poliklinik[] = [];

  poliklinikSelected: boolean = false;
  selectedPoliklinik: Poliklinik = null;
  nama_poli: string = null;

  transaksiAmbulans: any;
  searchTerm: string;
  searchResult: any;

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "no_antrian";
  public sortOrder = "asc";

  constructor(
    private router: Router,
    private ambulansService: AmbulansService,
		private poliklinikService: PoliklinikService,
    private transaksiService: TransaksiService,
    private tindakanService: TindakanService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) { }

  ngOnInit() {
    this.searchTerm = '';
    this.searchResult = null;
    this.transaksiAmbulans = null;    

    this.poliklinikService.getAllPoliklinik().subscribe(
      data => { this.allPoliklinik = data }
    );

    this.ambulansService.getAllAvailableAmbulans().subscribe(
      data => { this.allAmbulans = data }
    );
  }

  onEnter(event) {
    if (event.keyCode == 13)
      this.searchTransaksi();
  }

  searchTransaksi() {
    if (this.searchTerm != '') {
      if (this.searchTerm.match(/[a-z]/i)) {
        this.transaksiService.getAllTransaksi(null, this.searchTerm, 'open').subscribe(
          data => {
            this.searchResult = data;
            if (this.searchResult.allTransaksi[0] == null) {
              let toastOptions:ToastOptions = {
                  title: 'Error',
                  msg: 'Nama pasien tidak ditemukan',
                  showClose: true,
                  timeout: 3000,
                  theme: 'material'
              };
              this.toastyService.error(toastOptions);
            }
            else {
              this.transaksiAmbulans = this.searchResult.allTransaksi[0];
              let toastOptions:ToastOptions = {
                title: 'Info',
                msg: 'Ditemukan ' + this.searchResult.allTransaksi.length + ' hasil',
                showClose: true,
                timeout: 3000,
                theme: 'material'
            };
            this.toastyService.info(toastOptions);
            }
          }
        )
      }
      else {
        this.transaksiService.getAllTransaksi(this.searchTerm, null, 'open').subscribe(
          data => {
            this.searchResult = data;
            if (this.searchResult.allTransaksi[0] == null) {
              let toastOptions:ToastOptions = {
                  title: 'Error',
                  msg: 'Kode pasien tidak ditemukan',
                  showClose: true,
                  timeout: 3000,
                  theme: 'material'
              };
              this.toastyService.error(toastOptions);
            }
            else {
              this.transaksiAmbulans = this.searchResult.allTransaksi[0];
            }
          }
        )
      }      
    }
    else {
      let toastOptions:ToastOptions = {
        title: 'Warning',
        msg: 'Kata kunci pencarian kosong',
        showClose: true,
        timeout: 3000,
        theme: 'material'
    };
    this.toastyService.warning(toastOptions);
    }
  }

  pemakaianAmbulans() {
    this.tindakanService.getTindakanReference('00.00').subscribe(
      data => {
        let tindakan: Tindakan[] = [];
        let temp: Tindakan = new Tindakan();
        
        temp.id_transaksi = this.transaksiAmbulans.id;
        temp.harga = data.harga;
        temp.keterangan = '';
        temp.kode_tindakan = data.kode;
        temp.id_pasien = this.transaksiAmbulans.id_pasien;
        temp.tanggal_waktu = this.transaksiAmbulans.waktu_masuk_pasien;
        temp.np_tenaga_medis = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
        temp.nama_ambulans = 'Ambulans belum dipilih';
        tindakan.push(temp);
    
        this.tindakanService.saveTindakan(tindakan).subscribe(
          data => {
            let toastOptions:ToastOptions = {
              title: 'Success',
              msg: 'Permintaan pemakaian ambulans sudah diteruskan ke petugas ambulans',
              showClose: true,
              timeout: 3000,
              theme: 'material'
            };

            this.toastyService.success(toastOptions);
            this.ngOnInit();
          },
          error => {
            let toastOptions:ToastOptions = {
              title: 'Error',
              msg: 'Permintaan pemakaian ambulans gagal dibuat',
              showClose: true,
              timeout: 3000,
              theme: 'material'
            };

            this.toastyService.error(toastOptions);
          }
        )
      }
    )
  }
}
