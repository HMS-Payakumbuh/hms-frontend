import { Component, OnInit }		from '@angular/core';

import { TenagaMedis } 					from './tenaga-medis';
import { Dokter }								from './dokter';
import { TenagaMedisService }		from './tenaga-medis.service';

@Component({
 	selector: 'tenaga-medis-list-page',
 	templateUrl: './tenaga-medis-list.component.html',
 	providers: [TenagaMedisService]
})

export class TenagaMedisListComponent implements OnInit {
	allTenagaMedis: TenagaMedis[];

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "id";
  public sortOrder = "asc";

	constructor(
		private tenagaMedisService: TenagaMedisService
	) {}
	
	ngOnInit() {
		this.tenagaMedisService.getAllTenagaMedis()
			.then(allTenagaMedis => this.allTenagaMedis = allTenagaMedis);
	}
}