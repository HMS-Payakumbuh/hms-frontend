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

	public tanggal_mulai: Date;
	public tanggal_selesai: Date;

	constructor(
		private laporanService: LaporanService,
		private lokasiObatService: LokasiObatService
	) {}

	ngOnInit(): void {
		this.lokasiObatService.getAllLokasiObat().subscribe(
			data => { this.allLokasiObat = data }
		);
    }

    downloadLaporanStokObat() {
    	window.location.href = this.stokObatUrl + '/export';
  	}

    downloadLaporanObatMasuk() {
    	window.location.href = this.obatMasukUrl + '/export';

    	/* this.laporanService.downloadLaporanObatMasuk().subscribe(
      		data => {
        		let url = window.URL.createObjectURL(data);
        		window.open(url);
      		}
    	) */
  	}

  	downloadLaporanObatPindah() {
    	window.location.href = this.obatPindahUrl + '/export';
  	}  	

  	downloadLaporanObatRusak() {
    	window.location.href = this.obatRusakUrl + '/export';
  	}

  	downloadLaporanObatEceran() {
    	window.location.href = this.obatEceranUrl + '/export';
  	}

  	downloadLaporanObatTebus() {
    	window.location.href = this.obatTebusUrl + '/export';
  	}

    downloadLaporanObatTindakan() {
      window.location.href = this.obatTindakanUrl + '/export';
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