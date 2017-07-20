import { Component, OnInit }		from '@angular/core';

import { Dokter }								from './dokter';
import { Poliklinik }           from '../layanan/poliklinik';
import { JadwalDokter }					from './jadwal-dokter';

import { TenagaMedisService }		from './tenaga-medis.service';
import { PoliklinikService }    from '../layanan/poliklinik.service';

@Component({
 	selector: 'jadwal-dokter-list-page',
 	templateUrl: './jadwal-dokter-list.component.html',
 	providers: [
    TenagaMedisService,
    PoliklinikService
  ]
})

export class JadwalDokterListComponent implements OnInit {
  allDokter: Dokter[];
  allJadwalDokter: JadwalDokter[];
  allPoliklinik: Poliklinik[];

  jadwalDokterModal: JadwalDokter = null;
  JadwalDokterModalNamaPoli: string = null;
  jadwalDokterModalNpDokter: string = null;
  jadwalDokterModalTanggal: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama_poliklinik";
  public sortOrder = "asc";

	constructor(
		private jadwalDokterService: TenagaMedisService,
    private poliklinikService: PoliklinikService
	) {}

	ngOnInit() {
		this.jadwalDokterService.getAllJadwalDokter().subscribe(
      data => { this.allJadwalDokter = data }
    )

    this.jadwalDokterService.getAllDokter().subscribe(
      data => { this.allDokter = data }
    )

    this.poliklinikService.getAllPoliklinik().subscribe(
      data => { this.allPoliklinik = data }
    )
	}

  newJadwalDokter() {
    this.jadwalDokterModal = new JadwalDokter();
  }

  createJadwalDokter() {
    this.jadwalDokterService.createJadwalDokter(this.jadwalDokterModal).subscribe(
      data => { this.ngOnInit() }
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
      data => { this.ngOnInit() }
    );
  }

  destroyJadwalDokter(nama_poli: string, np_dokter: string, tanggal: string) {
    this.jadwalDokterService.destroyJadwalDokter(nama_poli, np_dokter, tanggal).subscribe(
      data => { this.ngOnInit() }
    );
  }
}
