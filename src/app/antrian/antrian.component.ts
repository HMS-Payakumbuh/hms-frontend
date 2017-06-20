import { Component, OnInit,  ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Antrian }    from './antrian';
import { AntrianService } from './antrian.service';
import { Poliklinik }    from '../layanan/poliklinik';
import { PoliklinikService }    from '../layanan/poliklinik.service';

import * as _ from "lodash";

@Component({
  selector: 'antrian',
  templateUrl: './antrian.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AntrianService,
    PoliklinikService
  ]
})
export class AntrianComponent implements OnInit {
  allKategori: Poliklinik[];
  allAntrian: Antrian[];
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
      this.poliklinikService.getAllPoliklinik()
        .then(allPoliklinik => this.allKategori = _.uniqBy(allPoliklinik, 'kategori_antrian'));
      this.isfrontoffice = true;
    }
    else {
      this.layanan = 'Poli ' + this.layanan;
      this.route.params
        .switchMap((params: Params) => this.antrianService.getAntrian(params['namaLayanan']))
        .subscribe(allAntrian => {
            this.allAntrian = allAntrian;
            this.active = allAntrian[0].no_antrian;
          });
      this.isfrontoffice = false;
    }
  }

  private proses(antrian: Antrian) {
    this.nomor = antrian.no_antrian; 
    this.allAntrian.splice(this.allAntrian.indexOf(antrian), 1);
    if (this.umum) {
      this.active = _.find(this.allAntrian, {jenis: 'khusus'}).no_antrian;
    } else {
      this.active = _.find(this.allAntrian, {jenis: 'umum'}).no_antrian;
    }
    this.umum = !this.umum;
  }

  changeKategori() {
    this.antrianService.getAllAntrian()
      .then(allAntrian => this.allAntrian = allAntrian)
      .then(allAntrian => this.active = allAntrian[0].no_antrian);
  }
  
  submitted = false;

  onSubmit() { this.submitted = true; }
}