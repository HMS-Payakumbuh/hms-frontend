import { Component } from '@angular/core';

import { Diagnosis }          from './diagnosis';
import { DiagnosisReference }	from './diagnosis-reference';
import { DiagnosisService }		from './diagnosis.service';

@Component({
 	selector: 'diagnosis-reference-list-page',
 	templateUrl: './diagnosis-reference-list.component.html',
 	providers: [DiagnosisService]
})

export class DiagnosisReferenceListComponent {
	public allDiagnosisReference: DiagnosisReference[];

  diagnosisReferenceModal: DiagnosisReference = null;
  diagnosisReferenceModalKode: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "kode";
  public sortOrder = "asc";

	constructor(
		private diagnosisService: DiagnosisService
	) {}

	ngOnInit(): void {
		this.diagnosisService.getAllDiagnosisReference().subscribe(
      data => { this.allDiagnosisReference = data }
    );
	}

  newDiagnosisReference() {
    this.diagnosisReferenceModal = new DiagnosisReference();
  }

  createDiagnosisReference() {
    this.diagnosisService.createDiagnosisReference(this.diagnosisReferenceModal).subscribe(
      data => { window.location.reload() }
    );
  }

  editDiagnosisReference(kode: string, diagnosisReference: DiagnosisReference) {
    this.diagnosisReferenceModalKode = kode;
    this.diagnosisReferenceModal = Object.assign({}, diagnosisReference);
  }

  updateDiagnosisReference() {
    this.diagnosisService.updateDiagnosisReference(this.diagnosisReferenceModalKode, this.diagnosisReferenceModal).subscribe(
      data => { window.location.reload() }
    );
  }

  destroyDiagnosisReference(kode: string) {
    this.diagnosisService.destroyDiagnosisReference(kode).subscribe(
      data => { window.location.reload() }
    );
  }
}
