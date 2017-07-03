import { Component, OnInit }		from '@angular/core';

import { Poliklinik } 					from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';

@Component({
 	selector: 'poliklinik-list-page',
 	templateUrl: './poliklinik-list.component.html',
 	providers: [PoliklinikService]
})

export class PoliklinikListComponent implements OnInit {
	allPoliklinik: Poliklinik[];
	poliklinikModal: Poliklinik = null;
  poliklinikModalNama: string = null;
  poliklinikBaru: Poliklinik = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama";
  public sortOrder = "asc";

	constructor(
		private poliklinikService: PoliklinikService
	) {}

	ngOnInit() {
		this.poliklinikService.getAllPoliklinik().subscribe(
      data => { this.allPoliklinik = data }
    );
	}

  newPoliklinik() {
    this.poliklinikBaru = new Poliklinik();
  }

	editPoliklinik(nama: string, poliklinik: Poliklinik) {
    this.poliklinikModalNama = nama;
    this.poliklinikModal = new Poliklinik();
    this.poliklinikModal.nama = poliklinik.nama;
    this.poliklinikModal.kategori_antrian = poliklinik.kategori_antrian;
    this.poliklinikModal.kapasitas_pelayanan = poliklinik.kapasitas_pelayanan;
    this.poliklinikModal.sisa_pelayanan = poliklinik.sisa_pelayanan;
    this.poliklinikModal.id_lokasi = poliklinik.id_lokasi;
	}

  createPoliklinik() {
    this.poliklinikService.createPoliklinik(this.poliklinikBaru).subscribe(
      data => { window.location.reload() }
    );
  }

  updatePoliklinik() {
    this.poliklinikService.updatePoliklinik(this.poliklinikModalNama, this.poliklinikModal).subscribe(
      data => { window.location.reload() }
    );
  }

  destroyPoliklinik(nama: string) {
    this.poliklinikService.destroyPoliklinik(nama).subscribe(
      data => { window.location.reload() }
    );
  }
}
