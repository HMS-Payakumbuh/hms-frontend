import { Component, OnInit }		  from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }							  from '@angular/common';

import { Dokter }                 from './dokter';
import { TenagaMedisService }     from './tenaga-medis.service';

import { Poliklinik }             from '../layanan/poliklinik';
import { PoliklinikService }      from '../layanan/poliklinik.service';

@Component({
  selector: 'dokter-dashboard-page',
  templateUrl: './dokter-dashboard.component.html',
  providers: [
    TenagaMedisService,
    PoliklinikService
  ]
})

export class DokterDashboardComponent implements OnInit {
  dokter: Dokter = null;
  allPoliklinik: Poliklinik[] = [];
  selectedPoliklinik: Poliklinik = null;

  constructor(
    private route: ActivatedRoute,
    private tenagaMedisService: TenagaMedisService,
		private poliklinikService: PoliklinikService
	) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.tenagaMedisService.getDokter(params['noPegawai']))
      .subscribe(dokter => { this.dokter = dokter });

    this.poliklinikService.getAllPoliklinik().subscribe(
      data => { this.allPoliklinik = data }
    );
  }

  setPoliklinik(poliklinik: Poliklinik) {
    this.selectedPoliklinik = poliklinik;
  }
}
