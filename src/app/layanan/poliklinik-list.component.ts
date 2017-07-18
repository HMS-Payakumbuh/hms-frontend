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
    this.poliklinikModal = new Poliklinik();
  }

  createPoliklinik() {
    this.poliklinikService.createPoliklinik(this.poliklinikModal).subscribe(
      data => { this.ngOnInit() }
    );
  }

  editPoliklinik(nama: string, poliklinik: Poliklinik) {
    this.poliklinikModalNama = nama;
    this.poliklinikModal = Object.assign({}, poliklinik);
  }

  updatePoliklinik() {
    this.poliklinikService.updatePoliklinik(this.poliklinikModalNama, this.poliklinikModal).subscribe(
      data => { this.ngOnInit() }
    );
  }

  destroyPoliklinik(nama: string) {
    this.poliklinikService.destroyPoliklinik(nama).subscribe(
      data => { this.ngOnInit() }
    );
  }
}
