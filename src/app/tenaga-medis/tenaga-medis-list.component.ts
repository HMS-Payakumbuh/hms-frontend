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
  tenagaMedisModal: TenagaMedis = null;
  tenagaMedisModalNoPegawai: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "id";
  public sortOrder = "asc";

	constructor(
		private tenagaMedisService: TenagaMedisService
	) {}

	ngOnInit() {
		this.tenagaMedisService.getAllTenagaMedis().subscribe(
      data => { this.allTenagaMedis = data }
    );
	}

  newTenagaMedis() {
    this.tenagaMedisModal = new TenagaMedis();
  }

  createTenagaMedis() {
    this.tenagaMedisService.createTenagaMedis(this.tenagaMedisModal).subscribe(
      data => { window.location.reload() }
    );
  }

  editTenagaMedis(no_pegawai: string, tenagaMedis: TenagaMedis) {
    this.tenagaMedisModalNoPegawai = no_pegawai;
    this.tenagaMedisModal = Object.assign({}, tenagaMedis);
  }

  updateTenagaMedis() {
    this.tenagaMedisService.updateTenagaMedis(this.tenagaMedisModalNoPegawai, this.tenagaMedisModal).subscribe(
      data => { window.location.reload() }
    );
  }

  destroyTenagaMedis(no_pegawai: string) {
    this.tenagaMedisService.destroyTenagaMedis(no_pegawai).subscribe(
      data => { window.location.reload() }
    );
  }
}
