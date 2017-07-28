import { Component, OnInit }		  from '@angular/core';

import { Dokter }                 from './dokter';
import { TenagaMedisService }     from './tenaga-medis.service';

import { Poliklinik }             from '../layanan/poliklinik';
import { PoliklinikService }      from '../layanan/poliklinik.service';

import { Ambulans }               from '../layanan/ambulans';
import { AmbulansService }        from '../layanan/ambulans.service';

@Component({
  selector: 'dokter-dashboard-page',
  templateUrl: './dokter-dashboard.component.html',
  providers: [
    TenagaMedisService,
    PoliklinikService,
    AmbulansService
  ]
})

export class DokterDashboardComponent implements OnInit {
  dokter: Dokter = null;

  allPoliklinik: Poliklinik[] = [];
  allAmbulans: Ambulans[] = [];

  selectedPoliklinik: Poliklinik = null;
  selectedAmbulans: Ambulans = null;

  constructor(
    private tenagaMedisService: TenagaMedisService,
		private poliklinikService: PoliklinikService,
    private ambulansService: AmbulansService
	) {}

  ngOnInit() {
    let noPegawai: string = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
    this.tenagaMedisService.getDokter(noPegawai).subscribe(
      dokter => this.dokter = dokter
    );

    this.poliklinikService.getAllPoliklinik().subscribe(
      data => { this.allPoliklinik = data }
    );

    this.ambulansService.getAllAmbulans().subscribe(
      data => { this.allAmbulans = data }
    );
  }

  panggilAmbulans() {
    this.selectedAmbulans.status = "In Use";
    this.ambulansService.updateAmbulans(this.selectedAmbulans.nama, this.selectedAmbulans).subscribe(
      data => {}
    )
  }
}
