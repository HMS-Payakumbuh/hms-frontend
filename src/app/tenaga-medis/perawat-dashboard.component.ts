import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { Ambulans }               from '../layanan/ambulans';
import { AmbulansService }        from '../layanan/ambulans.service';
import { Poliklinik }             from '../layanan/poliklinik';
import { PoliklinikService }      from '../layanan/poliklinik.service';

import * as io from "socket.io-client";

@Component({
  selector: 'perawat-dashboard-page',
  templateUrl: './perawat-dashboard.component.html',
  providers: [
    AmbulansService,
    PoliklinikService
  ]
})

export class PerawatDashboardComponent implements OnInit {
  socket: any = null;

  allAmbulans: Ambulans[] = [];
  allPoliklinik: Poliklinik[] = [];

  poliklinikSelected: boolean = false;
  selectedPoliklinik: Poliklinik = null;
  selectedAmbulans: Ambulans = null;
  nama_poli: string = null;

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "no_antrian";
  public sortOrder = "asc";

  constructor(
    private router: Router,
    private ambulansService: AmbulansService,
		private poliklinikService: PoliklinikService
	) { }

  ngOnInit() {
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
