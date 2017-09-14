import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Observable }             from 'rxjs/Observable';

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
import { TindakanOperasi }               from '../layanan/tindakan-operasi';
import { TindakanOperasiService }        from '../layanan/tindakan-operasi.service';
import { PemakaianKamar }  from '../layanan/pemakaian-kamar';
import { PemakaianKamarService }  from '../layanan/pemakaian-kamar.service';
import { PemakaianKamarOperasi }  from '../layanan/pemakaian-kamar-operasi';
import { PemakaianKamarOperasiService }  from '../layanan/pemakaian-kamar-operasi.service';

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
    TindakanService,
    TindakanOperasiService,
    PemakaianKamarService,
    PemakaianKamarOperasiService
  ]
})

export class DokterDashboardComponent implements OnInit {
  dokter: Dokter;
  socket: any;

  allAmbulans: Ambulans[] = [];
  allAntrian: Antrian[] = [];
  allOnProcessAntrian: Antrian[] = [];
  allProcessedAntrian: Antrian[] = [];
  allPoliklinik: Poliklinik[] = [];

  allPemakaianRawat: any[] = [];
  allPemakaianICU: any[] = [];
  allPemakaianOperasi: any[] = [];
  allPemakaianOperasiTemp:any[] = [];

  allDaftarPemakaianRawatinap: any[] = [];
  allDaftarPemakaianICU: any[] = [];
  allDaftarPemakaianOperasi: any[] = [];

  allJasaDokterRawatinap: any[] = [];
  allJasaDokterOperasi: any[] = [];

  showPoliButton: boolean = true;
  poliklinikSelected: boolean = false;
  rawatinapSelected: boolean = false;
  icuSelected: boolean = false;
  operasiSeleted: boolean = false;
  selectedPoliklinik: Poliklinik = new Poliklinik();
  selectedAmbulans: Ambulans = null;
  selectedPemakaianRawatinap: any;
  selectedPemakaianICU: any;
  selectedPemakaianOperasi: any;

  tindakanOperasi: any[];

  transaksiRujukan: Transaksi = null;
  transaksiAmbulans: any = null;
  nama_poli: string = null;
  searchKodePasien: string = '';
  noPegawai: string

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
    private tindakanOperasiService: TindakanOperasiService,
    private pemakaianKamarService: PemakaianKamarService,
    private pemakaianKamarOperasiService: PemakaianKamarOperasiService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) {
    this.socket = io('http://localhost');
  }

  ngOnInit() {
    this.noPegawai = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
    
    let observables = [];
    observables.push(this.tenagaMedisService.getDokter(this.noPegawai));
    observables.push(this.poliklinikService.getAllPoliklinik());
    
    Observable.forkJoin(observables).subscribe(
      data => {
        this.dokter = data[0] as Dokter;
        this.allPoliklinik = data[1] as Poliklinik[];
        this.allPoliklinik = this.allPoliklinik.filter((poliklinik) => poliklinik.nama.indexOf(this.dokter.spesialis) > -1);
        
        if (this.allPoliklinik.length > 0) {
          this.selectedPoliklinik = this.allPoliklinik[0];
          this.showDaftarPasien();
        }
      }
    );
    
    this.ambulansService.getAllAvailableAmbulans().subscribe(
      data => { this.allAmbulans = data }
    );

    this.socket.on(this.noPegawai, (message) => this.updatePasienRujukan(message));
  }
  
  onEnter(event) {
    if (event.keyCode == 13)
      this.searchTransaksi();
  }

  searchTransaksi() {
    if (this.searchKodePasien != '') {
      this.transaksiService.getAllTransaksi(this.searchKodePasien, null, 'open').subscribe(
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

  setShowPoliButton(val: boolean) {
    this.showPoliButton = val;
  }

  showDaftarPasien() {
    this.showPoliButton = false;
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

  prosesAntrian(id: number) {
    this.antrianService.processAntrian(id).subscribe(
      data => {
        this.router.navigate(['/poliklinik', this.selectedPoliklinik.nama, data.id_transaksi])
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

    let toastOptions:ToastOptions = {
      title: 'Attention',
      msg: 'Terdapat pasien yang harus diperiksa',
      showClose: true,
      timeout: 5000,
      theme: 'material'
    };

    this.toastyService.info(toastOptions);
  }
}
