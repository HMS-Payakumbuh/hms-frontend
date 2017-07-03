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
	laboratoriumModal: Laboratorium = null;
  laboratoriumModalNama: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama";
  public sortOrder = "asc";

	constructor(
		private laboratoriumService: LaboratoriumService
	) {}

	ngOnInit() {
		this.laboratoriumService.getAllLaboratorium().subscribe(
      data => { this.allLaboratorium = data }
    );
	}

  newLaboratorium() {
    this.laboratoriumModal = new Laboratorium();
  }

  createLaboratorium() {
    this.laboratoriumService.createLaboratorium(this.laboratoriumModal).subscribe(
      data => { window.location.reload() }
    );
  }

	editLaboratorium(nama: string, laboratorium: Laboratorium) {
    this.laboratoriumModalNama = nama;
    this.laboratoriumModal = Object.assign({}, laboratorium);
	}

  updateLaboratorium() {
    this.laboratoriumService.updateLaboratorium(this.laboratoriumModalNama, this.laboratoriumModal).subscribe(
      data => { window.location.reload() }
    );
  }

  destroyLaboratorium(nama: string) {
    this.laboratoriumService.destroyLaboratorium(nama).subscribe(
      data => { window.location.reload() }
    );
  }
}
