import { Component, OnInit }		from '@angular/core';

import { Laboratorium } 					from './laboratorium';
import { LaboratoriumService }		from './laboratorium.service';

@Component({
 	selector: 'laboratorium-list-page',
 	templateUrl: './laboratorium-list.component.html',
 	providers: [LaboratoriumService]
})

export class LaboratoriumListComponent implements OnInit {
	allLaboratorium: Laboratorium[];

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama";
  public sortOrder = "asc";

	constructor(
		private laboratoriumService: LaboratoriumService
	) {}
	
	ngOnInit() {
		this.laboratoriumService.getAllLaboratorium()
			.then(allLaboratorium => this.allLaboratorium = allLaboratorium);
	}
}