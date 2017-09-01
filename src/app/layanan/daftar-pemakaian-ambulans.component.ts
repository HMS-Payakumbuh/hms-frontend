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
  allTindakan: Tindakan[] = [];

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

    this.tindakanService.getTindakanWithoutAmbulans().subscribe(
      data => { this.allTindakan = data }
    )
  }

  pilihAmbulans(tindakan: Tindakan) {
    this.tindakanService.updateTindakan(tindakan).subscribe(
      data => {
        this.ngOnInit();

        let ambulans: Ambulans = this.allAmbulans.find(ambulans => ambulans.nama == tindakan.nama_ambulans);
        ambulans.status = 'In Use';
        this.ambulansService.updateAmbulans(ambulans.nama, ambulans).subscribe(
          data => {
            let toastOptions:ToastOptions = {
              title: 'Success',
              msg: 'Pemilihan ambulans berhasil',
              showClose: true,
              timeout: 5000,
              theme: 'material'
            };
    
            this.toastyService.success(toastOptions);
          }
        )
      },
      error => {
        let toastOptions:ToastOptions = {
          title: 'Error',
          msg: 'Pemilihan ambulans gagal',
          showClose: true,
          timeout: 5000,
          theme: 'material'
        };

        this.toastyService.error(toastOptions);
      }
    )
  }
}
