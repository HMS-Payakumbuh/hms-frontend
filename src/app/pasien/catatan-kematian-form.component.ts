import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'catatan-kematian-form-page',
  templateUrl: './catatan-kematian-form.component.html'
})

export class CatatanKematianFormComponent {	

	constructor (		
		private changeDetectorRef: ChangeDetectorRef
	) {}

	// createCatatanKematian() {
  //   	this.PemakaianKamarJenazahService.createPemakaianKamarJenazah(this.pemakaianKamarJenazahModal).subscribe(
  //     		data => { window.location.reload() }
  //   	);
  // 	}
}