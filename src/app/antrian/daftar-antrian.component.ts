import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Antrian }    from './antrian';
import { Poliklinik }    from '../layanan/poliklinik';
import { PoliklinikService }    from '../layanan/poliklinik.service';

@Component({
  selector: 'daftar-antrian',
  templateUrl: './daftar-antrian.component.html',
  providers: [
    PoliklinikService
  ]
})
export class DaftarAntrianComponent implements OnInit {
  poliklinik: string;
  nama: string;
  disabilitas: boolean = false;
  usia: number = 0;
  allPoliklinik: Poliklinik[];

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService
  ) {}

  ngOnInit() {
    this.poliklinikService.getAllPoliklinik()
      .then(allPoliklinik => this.allPoliklinik = allPoliklinik);
  }

  public daftar() {
    if (this.usia >= 65 || this.disabilitas) {
      console.log(this.poliklinik +','+ this.nama +', khusus');
    } else {
      console.log(this.poliklinik +','+ this.nama +', umum');
    }
  }
    
  
}