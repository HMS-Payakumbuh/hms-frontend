import { Component, OnInit }		from '@angular/core';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { LokasiObat } 					from './lokasi-obat';
import { LokasiObatService }		from './lokasi-obat.service';

@Component({
 	selector: 'daftar-lokasi-obat-page',
 	templateUrl: './daftar-lokasi-obat.component.html',
 	providers: [LokasiObatService]
})

export class DaftarLokasiObatComponent implements OnInit {
	allLokasiObat: LokasiObat[];
	lokasiObatModal: LokasiObat = null;
  lokasiObatModalId: number = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "id";
  public sortOrder = "asc";

	constructor(
		private lokasiObatService: LokasiObatService,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig
	) {}

	ngOnInit() {
		this.lokasiObatService.getAllLokasiObat().subscribe(
      data => { this.allLokasiObat = data }
    );
	}

  newLokasiObat() {
    this.lokasiObatModal = new LokasiObat();
  }

  createLokasiObat() {
    this.lokasiObatService.createLokasiObat(this.lokasiObatModal).subscribe(
      data => {
        this.ngOnInit();
        let toastOptions: ToastOptions = {
            title: "Success",
            msg: "Lokasi obat berhasil ditambahkan",
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };            
        this.toastyService.success(toastOptions);
      },
      error => {
        this.handleError(error);
      }
    );
  }
  
	editLokasiObat(id: number, lokasiObat: LokasiObat) {
    this.lokasiObatModalId = id;
    this.lokasiObatModal = Object.assign({}, lokasiObat);
	}
  
  updateLokasiObat() {
    this.lokasiObatService.updateLokasiObat(this.lokasiObatModalId, this.lokasiObatModal).subscribe(
      data => {
        this.ngOnInit();
        let toastOptions: ToastOptions = {
            title: "Success",
            msg: "Lokasi obat berhasil diperbarui",
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };            
        this.toastyService.success(toastOptions);
      },
      error => {
        this.handleError(error);
      }
    );
  }

  destroyLokasiObat(id: number) {
    this.lokasiObatService.destroyLokasiObat(id).subscribe(
      data => {
        this.ngOnInit();
        let toastOptions: ToastOptions = {
            title: "Success",
            msg: "Lokasi obat berhasil dihapus",
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };            
        this.toastyService.success(toastOptions);
      },
      error => {
        this.handleError(error);
      }
    );
  }

  private handleError(error: any) {
    let toastOptions: ToastOptions = {
          title: "Error",
          msg: error,
          showClose: true,
          timeout: 5000,
          theme: 'material'
      };
      this.toastyService.error(toastOptions);
  }
}
