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

  nomor: number;
  active: number;
  umum: boolean = true;
  isfrontoffice: boolean;
  sub: any;
  layanan: string;

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService,
    private antrianService : AntrianService
  ) {}

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.layanan = params['namaLayanan'];
    });
    if (this.layanan === undefined) {
      this.layanan = 'Front Office';

      this.poliklinikService.getAllPoliklinik().subscribe(
        data => { this.allKategori = _.uniqBy(data, 'kategori_antrian') }
      );
      
      this.isfrontoffice = true;
    }
    else {
      this.route.params
        .switchMap((params: Params) => this.antrianService.getAntrian(params['namaLayanan']))
        .subscribe(allAntrian => {
            this.allAntrian = allAntrian;
            this.active = allAntrian[0].no_antrian;
          });
      this.isfrontoffice = false;
    }
  }

  private proses(jenis:string, antrian: any) {
    this.nomor = antrian.no_antrian;
    this.allAntrian.splice(this.allAntrian.indexOf(antrian), 1);
    if (jenis === 'undur') {
      if (this.isfrontoffice) {
        this.antrianService.updateAntrianFrontOffice(antrian.nama_layanan, antrian.no_antrian).subscribe();
      } else {
        this.antrianService.updateAntrian(antrian.id_transaksi, antrian.no_antrian).subscribe();
      }
    } else {
      if (this.isfrontoffice) {
        this.antrianService.destroyAntrianFrontOffice(antrian.nama_layanan, antrian.no_antrian).subscribe();
      } else {
        this.antrianService.destroyAntrian(antrian.id_transaksi, antrian.no_antrian).subscribe();
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
        this.active = allAntrian[0].no_antrian;
      });
  }

  submitted = false;

  onSubmit() { this.submitted = true; }
}
