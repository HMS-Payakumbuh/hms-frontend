import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Antrian }                from './antrian';
import { AntrianService }         from './antrian.service';
import { LaboratoriumService }    from '../layanan/laboratorium.service';
import { PoliklinikService }      from '../layanan/poliklinik.service';

import * as _ from "lodash";
import * as io from "socket.io-client";

@Component({
  selector: 'antrian-tampilan',
  templateUrl: './antrian-tampilan.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    AntrianService,
    PoliklinikService,
    LaboratoriumService
  ]
})
export class AntrianTampilanComponent implements OnInit {
  allKategori: any[] = [];
  allAntrian: any[];
  kategori: string;
  selectedKategori: string;
  total: number = 0;
  antrian: any = { no_antrian: null };
  umum: boolean = true;
  antrianEmpty: boolean;
  layanan: string;
  socket: any = null;

  constructor(
    private route: ActivatedRoute,
    private antrianService : AntrianService,
    private poliklinikService: PoliklinikService,
    private laboratoriumService: LaboratoriumService
  ) {
    this.socket = io('http://167.205.35.41');
  }

  ngOnInit() {
    this.updateKategori();
    this.selectedKategori = this.kategori;
    this.socket.on('antrianFrontOffice'+this.kategori, this.updateAntrianFrontOffice.bind(this));
    this.updateAntrianFrontOffice();
  }

  updateKategori() {
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

  updateAntrianFrontOffice() {
    this.antrianService.getAntrianFrontOffice(this.kategori)
      .subscribe(allAntrian => {
        this.allAntrian = allAntrian;
        this.total = allAntrian.length;
        if (this.total == 0)
          this.antrianEmpty = true;
        else
          this.antrianEmpty = false;  
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

  nextAntrian(umum: boolean) {
    if (umum) {
      return _.find(this.allAntrian, {jenis: 1}) ? _.find(this.allAntrian, {jenis: 1}): null;
    } else {
      return _.find(this.allAntrian, {jenis: 0}) ? _.find(this.allAntrian, {jenis: 0}): null;
    }
  }

  changeKategori(kategori: any) {
    this.selectedKategori = kategori;
    this.socket.on('antrianFrontOffice'+this.kategori, this.updateAntrianFrontOffice.bind(this));
    this.updateAntrianFrontOffice();
  }
}
