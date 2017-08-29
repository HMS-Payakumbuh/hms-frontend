import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Ambulans }               from '../layanan/ambulans';
import { AmbulansService }        from '../layanan/ambulans.service';
import { Tindakan }               from '../layanan/tindakan';
import { TindakanService }        from '../layanan/tindakan.service';

@Component({
  selector: 'daftar-pemakaian-ambulans-page',
  templateUrl: './daftar-pemakaian-ambulans.component.html',
  providers: [
    AmbulansService,
    TindakanService
  ]
})

export class DaftarPemakaianAmbulansComponent implements OnInit {

  allAmbulans: Ambulans[] = [];

  selectedAmbulans: Ambulans = null;

  transaksiAmbulans: any = null;

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "no_antrian";
  public sortOrder = "asc";

  constructor(
    private router: Router,
    private ambulansService: AmbulansService,
    private tindakanService: TindakanService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) { }

  ngOnInit() {
    this.ambulansService.getAllAvailableAmbulans().subscribe(
      data => { this.allAmbulans = data }
    );
  }
}
