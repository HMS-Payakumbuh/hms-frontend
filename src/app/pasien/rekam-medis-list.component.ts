import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RekamMedis }	from './rekam-medis';
import { RekamMedisService }		from './rekam-medis.service';

@Component({
 	selector: 'rekam-medis-list',
 	templateUrl: './rekam-medis-list.component.html',
 	providers: [RekamMedisService]
})

export class RekamMedisListComponent implements OnInit {
	public allRekamMedis: RekamMedis[];
	public rekamMedis: RekamMedis = null;
	public pasienId: number= null;
	private sub: any;

	public filterQuery = "";
 	public rowsOnPage = 10;
	public sortBy = "id";
	public sortOrder = "asc";

	constructor(
		private route: ActivatedRoute,
		private rekamMedisService: RekamMedisService
	) {}

	ngOnInit() {
		this.sub = this.route.params
	      .subscribe(params => {
	        this.pasienId = params['idPasien'];
	    });
		this.rekamMedisService.getAllRekamMedisOfPasien(this.pasienId)
			.subscribe(allRekamMedis => this.allRekamMedis = allRekamMedis);

	}
}