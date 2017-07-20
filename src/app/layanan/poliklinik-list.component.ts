import { Component, OnInit }		from '@angular/core';

import { LokasiObat }           from '../farmasi/lokasi-obat/lokasi-obat';
import { LokasiObatService }    from '../farmasi/lokasi-obat/lokasi-obat.service';

import { Poliklinik } 					from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';

@Component({
 	selector: 'poliklinik-list-page',
 	templateUrl: './poliklinik-list.component.html',
 	providers: [
    LokasiObatService,
    PoliklinikService
  ]
})

export class PoliklinikListComponent implements OnInit {
  allLokasiObat: LokasiObat[];
  allPoliklinik: Poliklinik[];
	poliklinikModal: Poliklinik = null;
  poliklinikModalNama: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama";
  public sortOrder = "asc";

	constructor(
    private lokasiObatService: LokasiObatService,
    private poliklinikService: PoliklinikService
	) {}

	ngOnInit() {
		this.poliklinikService.getAllPoliklinik().subscribe(
      data => { this.allPoliklinik = data }
    );

    this.lokasiObatService.getAllLokasiObat().subscribe(
      data => { this.allLokasiObat = data }
    )
	}

  newPoliklinik() {
    this.poliklinikModal = new Poliklinik();
  }

  createPoliklinik() {
    for (let lokasiObat of this.allLokasiObat) {
      if (lokasiObat.nama == this.poliklinikModal.nama) {
        this.poliklinikModal.id_lokasi = lokasiObat.id;
        this.poliklinikService.createPoliklinik(this.poliklinikModal).subscribe(
          data => { this.ngOnInit() }
        );
      }
    }
  }

  editPoliklinik(nama: string, poliklinik: Poliklinik) {
    this.poliklinikModalNama = nama;
    this.poliklinikModal = Object.assign({}, poliklinik);
  }

  updatePoliklinik() {
    for (let lokasiObat of this.allLokasiObat) {
      if (lokasiObat.nama == this.poliklinikModal.nama) {
        this.poliklinikModal.id_lokasi = lokasiObat.id;
        this.poliklinikService.updatePoliklinik(this.poliklinikModalNama, this.poliklinikModal).subscribe(
          data => { this.ngOnInit() }
        );
      }
    }
  }

  destroyPoliklinik(nama: string) {
    this.poliklinikService.destroyPoliklinik(nama).subscribe(
      data => { this.ngOnInit() }
    );
  }
}
