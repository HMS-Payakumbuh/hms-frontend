import { Component, OnInit }		  from '@angular/core';
import { Router }                 from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Antrian }         from './antrian';
import { AntrianService }         from './antrian.service';

@Component({
  selector: 'daftar-pasien-igd-page',
  templateUrl: './daftar-pasien-igd.component.html',
  providers: [
    AntrianService
  ]
})

export class DaftarPasienIGDComponent implements OnInit {
  allAntrian: Antrian[] = [];

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "waktu_masuk";
  public sortOrder = "asc";

  constructor(
    private router: Router,
    private antrianService: AntrianService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) { }

  ngOnInit() {
    this.antrianService.getAllAntrian('IGD').subscribe(
      data => {
        this.allAntrian = data;
      }
    );
  }

  periksa(id_transaksi: number, no_antrian: number) {
    this.antrianService.destroyAntrian(id_transaksi, no_antrian).subscribe(
      data => this.router.navigate(['/poliklinik', 'IGD', id_transaksi])
    )
  }
}
