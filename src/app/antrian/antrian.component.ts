import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from "lodash";
import { Antrian }    from './antrian';
import { Poliklinik }    from '../layanan/poliklinik';
import { PoliklinikService }    from '../layanan/poliklinik.service';

@Component({
  selector: 'antrian',
  templateUrl: './antrian.component.html',
  providers: [
    PoliklinikService
  ]
})
export class AntrianComponent implements OnInit {
  antrianUmum: Antrian[] = [
      {no_antrian: 1, nama_pasien: 'Jonathan',  waktu:'09:15:15' },
      {no_antrian: 2, nama_pasien: 'Ben Lemuel',  waktu:'09:15:45'},
      {no_antrian: 3, nama_pasien: 'Fiqie', waktu:'09:16:15'},
  ]; //Mock-up

  antrianKhusus: Antrian[] = [
      {no_antrian: 4, nama_pasien: 'Al Ex',  waktu:'09:15:15' },
      {no_antrian: 5, nama_pasien: 'Hu Wan',  waktu:'09:15:45'},
      {no_antrian: 6, nama_pasien: 'Gunawan', waktu:'09:16:15'},
  ];
  allKategori: Poliklinik[];
  kategori: string;

  nomor: number = 0;
  active: number = 1;
  umum: boolean = true;
  isfrontoffice: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService
  ) {}

  ngOnInit() {
    this.poliklinikService.getAllPoliklinik()
      .then(allPoliklinik => this.allKategori = _.uniqBy(allPoliklinik, 'kategori_antrian'));
  }

  public proses(no_antrian: number) {
    this.nomor = no_antrian;
    if (this.umum) {
      this.antrianUmum.splice(0 ,1);
      this.active = this.antrianKhusus[0].no_antrian;
    }
    else {
      this.antrianKhusus.splice(0 ,1);
      this.active = this.antrianUmum[0].no_antrian;
    }
    this.umum = !this.umum;
  }

  changeKategori() {
    console.log("kategori baru");
  }
  
  submitted = false;

  onSubmit() { this.submitted = true; }
}