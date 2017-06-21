import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'obat-resep-form-page',
  templateUrl: './obat-resep-form.component.html'
})

export class ObatResepFormComponent {	

	rowData = [];

	constructor (		
		private changeDetectorRef: ChangeDetectorRef
	) {}

	addObatEntry() {
	    this.rowData.push({
	    	kode_obat: 1,
	    })
	}

	removeObatEntry(rowNumber: number) {
	    this.rowData.splice(rowNumber, 1);
    	this.changeDetectorRef.detectChanges();
	}
}