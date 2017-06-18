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
    console.log(this.poliklinik + this.usia + this.disabilitas);
  }
  
}