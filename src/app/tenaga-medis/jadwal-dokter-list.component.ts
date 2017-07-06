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
  jadwalDokterModal: JadwalDokter = null;
  JadwalDokterModalNamaPoli: string = null;
  jadwalDokterModalNpDokter: string = null;
  jadwalDokterModalTanggal: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama_poliklinik";
  public sortOrder = "asc";

	constructor(
		private jadwalDokterService: TenagaMedisService
	) {}

	ngOnInit() {
		this.jadwalDokterService.getAllJadwalDokter().subscribe(
      data => { this.allJadwalDokter = data }
    )
	}

  newJadwalDokter() {
    this.jadwalDokterModal = new JadwalDokter();
  }

  createJadwalDokter() {
    this.jadwalDokterService.createJadwalDokter(this.jadwalDokterModal).subscribe(
      data => { window.location.reload() }
    );
  }

  editJadwalDokter(nama_poli: string, np_dokter: string, tanggal: string, jadwalDokter: JadwalDokter) {
    this.JadwalDokterModalNamaPoli = nama_poli;
    this.jadwalDokterModalNpDokter = np_dokter;
    this.jadwalDokterModalTanggal = tanggal;
    this.jadwalDokterModal = Object.assign({}, jadwalDokter);
  }

  updateJadwalDokter() {
    this.jadwalDokterService.updateJadwalDokter(this.JadwalDokterModalNamaPoli, this.jadwalDokterModalNpDokter, this.jadwalDokterModalTanggal, this.jadwalDokterModal).subscribe(
      data => { window.location.reload() }
    );
  }

  destroyJadwalDokter(nama_poli: string, np_dokter: string, tanggal: string) {
    this.jadwalDokterService.destroyJadwalDokter(nama_poli, np_dokter, tanggal).subscribe(
      data => { window.location.reload() }
    );
  }
}
