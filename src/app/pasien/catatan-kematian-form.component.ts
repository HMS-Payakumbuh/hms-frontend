import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Pasien }    from './pasien';
import { CatatanKematian } from './catatan-kematian';
import { PasienService }    from './pasien.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'catatan-kematian-form-page',
  templateUrl: './catatan-kematian-form.component.html',
  providers: [
    PasienService,
  ]
})

export class CatatanKematianFormComponent implements OnInit {
  sub: any;
  search: string;
  searchDone: boolean;
  canSearch: boolean;
  tanggal_kematian: string;
  waktu_kematian: string;
  pasien: Pasien;
  catatanKematian: CatatanKematian;	
  allPasien: Pasien[];
  datePipe: any = new DatePipe('id');
  config: any;

  genders = [{id: 1, nama: 'Laki-laki'}, {id: 2, nama: 'Perempuan'}];

	constructor (
    private route: ActivatedRoute,		
    private pasienService: PasienService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) {}

	ngOnInit() {
    this.pasien = new Pasien();
    this.catatanKematian = new CatatanKematian();

    this.sub = this.route.params
      .subscribe(params => {
        if (params['kodePasien'] === null)
          this.canSearch = true;
        else {
          this.canSearch = false;
          this.allPasien = [];
          this.pasienService.getPasien(params['kodePasien'])
            .subscribe(allPasien => {
              if (allPasien) {
                this.allPasien.push(allPasien);
                this.pasien = this.allPasien[0];
                this.selectPasien();
              }
            });
        }  
        
    });
  }

  searchPasien() {
    if (this.search) {
      if (this.search.match(/\d/)) {
        this.allPasien = [];
        this.pasienService.getPasien(this.search)
          .subscribe(allPasien => {
            if (allPasien) {
              this.allPasien.push(allPasien);
              this.pasien = this.allPasien[0];
              this.selectPasien();
            }
          });
      } else {
         this.pasienService.getPasienByName(this.search)
          .subscribe(allPasien => this.allPasien = allPasien);
      }
    }
  }

  selectPasien() {
    this.pasien.tanggal_lahir = this.datePipe.transform(this.pasien.tanggal_lahir, 'dd-MM-yyyy');
    this.searchDone = true;
  }

  createCatatanKematian() {
    this.catatanKematian.id_pasien = this.pasien.id;
    this.catatanKematian.waktu_kematian = this.tanggal_kematian + ' ' + this.waktu_kematian;
    this.pasienService.createCatatanKematian(this.catatanKematian).subscribe(
      data => {
        this.catatanKematian = data.json;

        if (data.status === 201) {
          let toastOptions:ToastOptions = {
            title: "Pembuatan Catatan Kematian Sukses !",
            msg: "Catatan Kematian untuk pasien dengan kode : "+ this.pasien.kode_pasien +" berhasil dibuat.",
            showClose: true,
            timeout: 2500,
            theme: 'material'
          };

          this.toastyService.success(toastOptions);
        } else if (data.status === 202) {
          let toastOptions:ToastOptions = {
            title: "Pembuatan Catatan Kematian Gagal !",
            msg: data.json.error,
            showClose: true,
            timeout: 2500,
            theme: 'material'
          };

          this.toastyService.error(toastOptions);
        }
      });
  }
}