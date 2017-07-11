import { Component, OnInit }		from '@angular/core';

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
  public sortBy = "nama";
  public sortOrder = "asc";

	constructor(
		private lokasiObatService: LokasiObatService
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
      data => { window.location.reload() }
    );
  }
  
	editLokasiObat(id: number, lokasiObat: LokasiObat) {
    this.lokasiObatModalId = id;
    this.lokasiObatModal = Object.assign({}, lokasiObat);
	}
  
  updateLokasiObat() {
    this.lokasiObatService.updateLokasiObat(this.lokasiObatModalId, this.lokasiObatModal).subscribe(
      data => { window.location.reload() }
    );
  }

  destroyLokasiObat(id: number) {
    this.lokasiObatService.destroyLokasiObat(id).subscribe(
      data => { window.location.reload() }
    );
  }
}
