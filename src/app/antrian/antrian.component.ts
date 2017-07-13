import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Antrian }    from './antrian';
import { AntrianService } from './antrian.service';
import { Poliklinik }    from '../layanan/poliklinik';
import { PoliklinikService }    from '../layanan/poliklinik.service';

import * as _ from "lodash";

@Component({
  selector: 'antrian',
  templateUrl: './antrian.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    AntrianService,
    PoliklinikService
  ]
})
export class AntrianComponent implements OnInit {
  allKategori: Poliklinik[];
  allAntrian: any[];
  kategori: string;
  total: number = 0;
  //socket:any = null;
  antrian: any = { no_antrian: null };
  active: number;
  umum: boolean = true;
  isfrontoffice: boolean;
  ispoli: boolean;
  sub: any;
  layanan: string;

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService,
    private antrianService : AntrianService
  ) {}

  ngOnInit() {
/*    this.socket = io.connect('http://localhost:8000');
    this.socket.on('message', function (data) {
        if (data)
          alert(data);
      });*/
    this.sub = this.route.params
      .subscribe(params => {
        this.layanan = params['namaLayanan'];
    });
    if (this.layanan === undefined) {
      this.layanan = 'Front Office';
      this.antrianService.getAllAntrianFrontOffice().subscribe(
        data => { this.allKategori = _.uniqBy(data, 'kategori_antrian') }
      );

      this.isfrontoffice = true;
    }
    else {
      this.route.params
        .switchMap((params: Params) => this.antrianService.getAntrian(params['namaLayanan']))
        .subscribe(allAntrian => {
            this.allAntrian = allAntrian;
            this.total = allAntrian.length;
            this.antrian = allAntrian[0];
          });
      this.isfrontoffice = false;
      if (this.layanan.substring(0, 4) === 'Poli')
        this.ispoli = true;
      else
        this.ispoli = false;  
    }
  }

  private proses(jenis:string) {
    this.allAntrian.splice(this.allAntrian.indexOf(this.antrian), 1);
    if (jenis === 'undur') {
      if (this.isfrontoffice) {
        this.antrianService.updateAntrianFrontOffice(this.antrian.nama_layanan, this.antrian.no_antrian).subscribe();
      } else {
        this.antrianService.updateAntrian(this.antrian.id_transaksi, this.antrian.no_antrian).subscribe();
      }
    } else {
      if (this.isfrontoffice) {
        this.antrianService.destroyAntrianFrontOffice(this.antrian.nama_layanan, this.antrian.no_antrian).subscribe();
      } else {
        this.antrianService.destroyAntrian(this.antrian.id_transaksi, this.antrian.no_antrian).subscribe();
      }
    }

    this.active = this.nextAntrian(this.umum);
    if (!this.active)
      this.active = this.nextAntrian(!this.umum);
    else
      this.umum = !this.umum;
  }

  private nextAntrian(umum: boolean) {
    if (umum) {
      return _.find(this.allAntrian, {jenis: 1}) ? _.find(this.allAntrian, {jenis: 1}).no_antrian: null;
    } else {
      return _.find(this.allAntrian, {jenis: 0}) ? _.find(this.allAntrian, {jenis: 0}).no_antrian: null;
    }
  }

  private changeKategori() {
    this.antrianService.getAntrianFrontOffice(this.kategori)
      .subscribe(allAntrian => {
        this.allAntrian = allAntrian;
        this.total = allAntrian.length;
        this.antrian = allAntrian[0];
      });
  }

  submitted = false;

  onSubmit() { this.submitted = true; }
}
