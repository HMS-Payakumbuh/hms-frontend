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

  transaksiAmbulans: any = null;
  searchKodePasien: string = '';

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
    if (this.searchKodePasien != '') {
      this.transaksiService.getAllTransaksi(this.searchKodePasien, null, 'open').subscribe(
        data => {
          this.transaksiAmbulans = data;
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
    this.tindakanService.getTindakanReference('00.00').subscribe(
      data => {
        let tindakan: Tindakan[] = [];
        let temp: Tindakan = new Tindakan();
        
        temp.id_transaksi = this.transaksiAmbulans.allTransaksi[0].id;
        temp.harga = data.harga;
        temp.keterangan = '';
        temp.kode_tindakan = data.kode;
        temp.id_pasien = this.transaksiAmbulans.allTransaksi[0].id_pasien;
        temp.tanggal_waktu = this.transaksiAmbulans.allTransaksi[0].waktu_masuk_pasien;
        temp.np_tenaga_medis = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
        temp.nama_ambulans = 'Ambulans belum dipilih';
        tindakan.push(temp);
    
        this.tindakanService.saveTindakan(tindakan).subscribe(
          data => {
            let toastOptions:ToastOptions = {
              title: 'Success',
              msg: 'Permintaan pemakaian ambulans sudah diteruskan ke petugas ambulans',
              showClose: true,
              timeout: 5000,
              theme: 'material'
            };

            this.toastyService.success(toastOptions);
            this.transaksiAmbulans = null;
            this.searchKodePasien = '';
          },
          error => {
            let toastOptions:ToastOptions = {
              title: 'Error',
              msg: 'Permintaan pemakaian ambulans gagal dibuat',
              showClose: true,
              timeout: 5000,
              theme: 'material'
            };

            this.toastyService.error(toastOptions);
          }
        )
      }
    )
  }
}
