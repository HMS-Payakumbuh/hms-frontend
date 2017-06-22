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

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama";
  public sortOrder = "asc";

	constructor(
		private poliklinikService: PoliklinikService
	) {}
	
	ngOnInit() {
		this.poliklinikService.getAllPoliklinik()
			.then(allPoliklinik => this.allPoliklinik = allPoliklinik);
	}

	editPoliklinik(poliklinik: Poliklinik) {
		this.poliklinikModal = poliklinik;
	}
}