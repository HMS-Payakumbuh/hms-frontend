import { Component, OnInit, Input }		  from '@angular/core';
import { ENV }	from '../../environment';

import { LaporanService } from './laporan.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

@Component({
  selector: 'laporan-page',
  templateUrl: './laporan.component.html',
  providers: [LaporanService, LokasiObatService]
})

export class LaporanComponent implements OnInit {
	
	private stokObatUrl = ENV.stokObatUrl;
	private obatMasukUrl = ENV.obatMasukUrl;
	private obatPindahUrl = ENV.obatPindahUrl;
	private obatRusakUrl = ENV.obatRusakUrl;
	private obatEceranUrl = ENV.obatEceranUrl;
	private obatTebusUrl = ENV.obatTebusUrl;
  private obatTindakanUrl = ENV.obatTindakanUrl;

	public jenis: string;

	public allLokasiObat: LokasiObat[];
	public lokasi: number;

	public tanggal_mulai: String;
	public tanggal_selesai: String;

	constructor(
		private laporanService: LaporanService,
		private lokasiObatService: LokasiObatService
	) {}

	ngOnInit(): void {
		this.lokasiObatService.getAllLokasiObat().subscribe(
			data => { this.allLokasiObat = data }
		);

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    this.tanggal_mulai = yyyy + '-' + mm + '-' + dd;
    this.tanggal_selesai = yyyy + '-' +mm + '-' + dd;
    this.lokasi = 0;
  }

  downloadLaporanStokObat() {  	
    window.location.href = this.stokObatUrl + '/export/' + this.lokasi;
	}

  downloadLaporanObatMasuk() {
  	window.location.href = this.obatMasukUrl + '/export?tanggal_mulai=' + this.tanggal_mulai + '&tanggal_selesai=' + this.tanggal_selesai;

  	/* this.laporanService.downloadLaporanObatMasuk().subscribe(
    		data => {
      		let url = window.URL.createObjectURL(data);
      		window.open(url);
    		}
  	) */
	}

	downloadLaporanObatPindah() {
  	window.location.href = this.obatPindahUrl + '/export?tanggal_mulai=' + this.tanggal_mulai + '&tanggal_selesai=' + this.tanggal_selesai;
	}  	

	downloadLaporanObatRusak() {
  	window.location.href = this.obatRusakUrl + '/export?tanggal_mulai=' + this.tanggal_mulai + '&tanggal_selesai=' + this.tanggal_selesai;
	}

	downloadLaporanObatEceran() {
  	window.location.href = this.obatEceranUrl + '/export?tanggal_mulai=' + this.tanggal_mulai + '&tanggal_selesai=' + this.tanggal_selesai;
	}

	downloadLaporanObatTebus() {
  	window.location.href = this.obatTebusUrl + '/export?tanggal_mulai=' + this.tanggal_mulai + '&tanggal_selesai=' + this.tanggal_selesai;
	}

  downloadLaporanObatTindakan() {
    window.location.href = this.obatTindakanUrl + '/export?tanggal_mulai=' + this.tanggal_mulai + '&tanggal_selesai=' + this.tanggal_selesai;
  }

	downloadLaporan() {
		if (this.jenis == "Stok Obat") {
			this.downloadLaporanStokObat()
		} else if (this.jenis == "Obat Masuk") {
			this.downloadLaporanObatMasuk()
		} else if (this.jenis == "Obat Pindah") {
			this.downloadLaporanObatPindah()
		} else if (this.jenis == "Obat Rusak") {
			this.downloadLaporanObatRusak()
		} else if (this.jenis == "Obat Eceran") {
			this.downloadLaporanObatEceran()
		} else if (this.jenis == "Obat Tebus") {
			this.downloadLaporanObatTebus()
		} else if (this.jenis == "Obat Tindakan") {
      this.downloadLaporanObatTindakan()
    } 
	}
}