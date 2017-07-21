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

  tindakanReferenceModal: TindakanReference = null;
  tindakanReferenceModalKode: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "kode";
  public sortOrder = "asc";

	constructor(
		private tindakanService: TindakanService
	) {}

	ngOnInit(): void {
		this.tindakanService.getAllTindakanReference().subscribe(
      data => { this.allTindakanReference = data }
    );
	}

  newTindakanReference() {
    this.tindakanReferenceModal = new TindakanReference();
  }

  createTindakanReference() {
    this.tindakanService.createTindakanReference(this.tindakanReferenceModal).subscribe(
      data => { this.ngOnInit() }
    );
  }

  editTindakanReference(kode: string, tindakanReference: TindakanReference) {
    this.tindakanReferenceModalKode = kode;
    this.tindakanReferenceModal = Object.assign({}, tindakanReference);
  }

  updateTindakanReference() {
    this.tindakanService.updateTindakanReference(this.tindakanReferenceModalKode, this.tindakanReferenceModal).subscribe(
      data => { this.ngOnInit() }
    );
  }

  destroyTindakanReference(kode: string) {
    this.tindakanService.destroyTindakanReference(kode).subscribe(
      data => { this.ngOnInit() }
    );
  }
}
