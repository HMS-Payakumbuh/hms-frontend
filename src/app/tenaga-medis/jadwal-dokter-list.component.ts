import { Component, OnInit }		from '@angular/core';

import { Dokter }								from './dokter';
import { JadwalDokter }					from './jadwal-dokter';
import { TenagaMedisService }		from './tenaga-medis.service';

@Component({
 	selector: 'jadwal-dokter-list-page',
 	templateUrl: './jadwal-dokter-list.component.html',
 	providers: [TenagaMedisService]
})

export class JadwalDokterListComponent implements OnInit {
	allJadwalDokter: JadwalDokter[];

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama_poliklinik";
  public sortOrder = "asc";

	constructor(
		private tenagaMedisService: TenagaMedisService
	) {}

	ngOnInit() {
		this.tenagaMedisService.getAllJadwalDokter().subscribe(
      data => { this.allJadwalDokter = data }
    )
	}
}
