import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Antrian }                from './antrian';
import { AntrianService }         from './antrian.service';
import { Poliklinik }             from '../layanan/poliklinik';
import { PoliklinikService }      from '../layanan/poliklinik.service';
import { Transaksi }              from '../transaksi/transaksi';
import { TransaksiService }       from '../transaksi/transaksi.service'
import { User }                   from '../auth/user';
import { AuthenticationService }  from '../auth/authentication.service';

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
    TransaksiService
  ]
})
export class AntrianComponent implements OnInit {
  allKategori: Poliklinik[];
  allAntrian: any[];
  kategori: string;
  selectedKategori: string;
  total: number = 0;
  antrian: any = { no_antrian: null };
  umum: boolean = true;
  antrianEmpty:boolean;
  isfrontoffice: boolean;
  isPoli: boolean;
  sub: any;
  layanan: string;
  socket: any = null;
  user: any;
  searchTransaksiRujukanTerm: string = '';
  transaksiRujukan: Transaksi[] = [];

  @Input()
  public alerts: Array<IAlert> = [];

  public filterQuery = "";
  public rowsOnPage = 4;
  public sortBy = "no_transaksi";
  public sortOrder = "asc";

  constructor(
    private route: ActivatedRoute,
    private antrianService : AntrianService,
    private authenticationService: AuthenticationService,
    private poliklinikService: PoliklinikService,
    private transaksiService: TransaksiService
  ) { this.socket = io('http://localhost'); }

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
    }
    else {
      this.updateAntrian();
      this.isfrontoffice = false;
      if (this.layanan.substring(0, 4) === 'Poli')
        this.isPoli = true;
      else
        this.isPoli = false;
      this.socket.on('antrianLayanan', this.updateAntrian.bind(this));
    }
  }

  private updateKategori() {
    this.antrianService.getAllAntrianFrontOffice().subscribe(
        data => {
          this.allKategori = _.sortBy(_.uniqBy(data, 'kategori_antrian'), 'kategori_antrian'); 
        }
      );
  }

  private updateAntrian() {
    this.route.params
        .switchMap((params: Params) => this.antrianService.getAntrian(params['namaLayanan']))
        .subscribe(allAntrian => {
          console.log(allAntrian);
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
        this.updateKategori();
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
    this.ngOnInit();
  }

  private onEnter(event) {
    if (event.keyCode == 13) {
      this.searchTransaksiRujukan();
    }
  }

  private searchTransaksiRujukan() {
    this.transaksiService.getTransaksiByKodePasien(this.searchTransaksiRujukanTerm).subscribe(
      data => {
        if (data.length == 0) {
          this.transaksiRujukan = [];
          this.alerts.pop();
          this.alerts.push({id: 1, type: 'warning', message: 'Pasien tidak ditemukan'});
        }
        else {
          this.alerts.pop();
          this.transaksiRujukan = data;
        }
      }
    )
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  submitted = false;

  onSubmit() { this.submitted = true; }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
