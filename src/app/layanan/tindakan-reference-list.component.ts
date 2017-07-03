import { Component } from '@angular/core';

import { TindakanReference }	from './tindakan-reference';
import { TindakanService }		from './tindakan.service';

@Component({
 	selector: 'tindakan-reference-list-page',
 	templateUrl: './tindakan-reference-list.component.html',
 	providers: [TindakanService]
})

export class TindakanReferenceListComponent {
	public allTindakanReference: TindakanReference[];

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "kode";
  public sortOrder = "asc";

	constructor(
		private JenisObatService: TindakanService
	) {}

	ngOnInit(): void {
		this.JenisObatService.getAllTindakanReference().subscribe(
      data => { this.allTindakanReference = data }
    );
	}
}
