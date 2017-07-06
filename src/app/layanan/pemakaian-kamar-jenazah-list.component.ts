import { Component, OnInit }		from '@angular/core';
import * as _ from "lodash";

import { PemakaianKamarJenazah } 				from './pemakaian-kamar-jenazah';
import { PemakaianKamarJenazahService }		    from './pemakaian-kamar-jenazah.service';
import { KamarJenazah } 				from './kamar-jenazah';
import { KamarJenazahService }		    from './kamar-jenazah.service';
import { TenagaMedis } 				from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }		    from '../tenaga-medis/tenaga-medis.service';
import { TindakanReference } 				from './tindakan-reference';
import { TindakanService }		    from './tindakan.service';
import { Transaksi } 				from '../transaksi/transaksi';
import { TransaksiService }		    from '../transaksi/transaksi.service';

@Component({
 	selector: 'pemakaian-kamar-jenazah-list-page',
 	templateUrl: './pemakaian-kamar-jenazah-list.component.html',
 	providers: [PemakaianKamarJenazahService, 
	 			TenagaMedisService, 
				TindakanService,
				TransaksiService,
				KamarJenazahService]
})

export class PemakaianKamarJenazahListComponent implements OnInit {
	allPemakaianKamarJenazah: PemakaianKamarJenazah[];
	allKamarJenazah: KamarJenazah[];

	transaksi: Transaksi;

	tanggalOperasi: Date;
	waktuMasuk: Date;
	waktuKeluar: Date;

	pemakaianKamarJenazahModal: PemakaianKamarJenazah = null;
    pemakaianKamarJenazahModalNama: string = null;
	
	constructor(
		private PemakaianKamarJenazahService: PemakaianKamarJenazahService,
		private tenagaMedisService: TenagaMedisService,
		private tindakanService: TindakanService,
		private transaksiService: TransaksiService,
		private kamarJenazahService: KamarJenazahService
	) {}
	
	ngOnInit() {
		this.PemakaianKamarJenazahService.getAllPemakaianKamarJenazah().subscribe(
     		data => { this.allPemakaianKamarJenazah = data }
    	);

		this.kamarJenazahService.getAllKamarJenazah().subscribe(
			data =>  { this.allKamarJenazah = data }
		);
	}

	newPemakaianKamarJenazah() {
    	this.pemakaianKamarJenazahModal = new PemakaianKamarJenazah();
		this.pemakaianKamarJenazahModal.harga = 300000;
 	}

    createPemakaianKamarJenazah() {
    	this.PemakaianKamarJenazahService.createPemakaianKamarJenazah(this.pemakaianKamarJenazahModal).subscribe(
      		data => { window.location.reload() }
    	);
  	}

	getRecentTransaksi(nama_pasien: string) {
		this.transaksiService.getRecentTransaksi(nama_pasien).
			subscribe(data => {
				this.transaksi = data;
				this.pemakaianKamarJenazahModal.id_transaksi = this.transaksi.id;
			})
	}
}