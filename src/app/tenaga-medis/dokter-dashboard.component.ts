import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
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

import * as io from "socket.io-client";

@Component({
  selector: 'dokter-dashboard-page',
  templateUrl: './dokter-dashboard.component.html',
  providers: [
    AntrianService,
    AmbulansService,
    PoliklinikService,
    TenagaMedisService,
    TransaksiService
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
  nama_poli: string = null;

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
    private transaksiService: TransaksiService
	) { this.socket = io('http://localhost') }

  ngOnInit() {
    let noPegawai: string = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
    this.tenagaMedisService.getDokter(noPegawai).subscribe(
      dokter => this.dokter = dokter
    );

    this.poliklinikService.getAllPoliklinik().subscribe(
      data => { this.allPoliklinik = data }
    );

    this.ambulansService.getAllAmbulans().subscribe(
      data => { this.allAmbulans = data }
    );

    this.socket.on(noPegawai, (message) => this.updatePasienRujukan(message));
  }

  panggilAmbulans() {
    this.selectedAmbulans.status = "In Use";
    this.ambulansService.updateAmbulans(this.selectedAmbulans.nama, this.selectedAmbulans).subscribe(
      data => {}
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

  prosesPasien(id_transaksi: number, no_antrian: number) {
    this.antrianService.updateAntrian(id_transaksi, no_antrian).subscribe(
      data => {}
    )
  }

  updatePasienRujukan(message: any) {
    if (this.selectedPoliklinik != null)
      this.showDaftarPasien();
    this.nama_poli = message.nama_poli;
    this.transaksiService.getTransaksi(message.id_transaksi).subscribe(
      data => this.transaksiRujukan = data
    )
  }
}
