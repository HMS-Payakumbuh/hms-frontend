import { Component, OnInit }		from '@angular/core';
import * as _ from "lodash";

import { PemakaianKamarOperasi } 				from './pemakaian-kamar-operasi';
import { PemakaianKamarOperasiService }		    from './pemakaian-kamar-operasi.service';
import { KamarOperasi } 				from './kamar-operasi';
import { KamarOperasiService }		    from './kamar-operasi.service';
import { TenagaMedis } 				from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }		    from '../tenaga-medis/tenaga-medis.service';
import { TindakanReference } 				from './tindakan-reference';
import { TindakanService }		    from './tindakan.service';
import { Transaksi } 				from '../transaksi/transaksi';
import { TransaksiService }		    from '../transaksi/transaksi.service';

@Component({
 	selector: 'pemakaian-kamar-operasi-list-page',
 	templateUrl: './pemakaian-kamar-operasi-list.component.html',
 	providers: [PemakaianKamarOperasiService, 
	 			TenagaMedisService, 
				TindakanService,
				TransaksiService,
				KamarOperasiService]
})

export class PemakaianKamarOperasiListComponent implements OnInit {
	allPemakaianKamarOperasi: PemakaianKamarOperasi[];
	allKamarOperasi: KamarOperasi[];
	allTenagaMedis: TenagaMedis[];
	allTindakanReference: TindakanReference[];

	transaksi: Transaksi;

	tanggalOperasi: Date;
	waktuMasuk: Date;
	waktuKeluar: Date;

	pemakaianKamarOperasiModal: PemakaianKamarOperasi = null;
    pemakaianKamarOperasiModalNama: string = null;

	constructor(
		private pemakaianKamarOperasiService: PemakaianKamarOperasiService,
		private tenagaMedisService: TenagaMedisService,
		private tindakanService: TindakanService,
		private transaksiService: TransaksiService,
		private kamarOperasiService: KamarOperasiService
	) {}

	ngOnInit() {
		this.pemakaianKamarOperasiService.getAllPemakaianKamarOperasi().subscribe(
     		data => { this.allPemakaianKamarOperasi = data }
    	);

		this.kamarOperasiService.getAllKamarOperasi().subscribe(
			data =>  { this.allKamarOperasi = data }
		);

		this.tindakanService.getAllTindakanReference().subscribe(
			data => {  this.allTindakanReference = data }
		);

		this.tenagaMedisService.getAllTenagaMedis().
			subscribe(data => this.allTenagaMedis = data);
	}

	newPemakaianKamarOperasi() {
    	this.pemakaianKamarOperasiModal = new PemakaianKamarOperasi();
 	}

    createPemakaianKamarOperasi(noKamar: string) {
    	this.pemakaianKamarOperasiService.createPemakaianKamarOperasi(this.pemakaianKamarOperasiModal).subscribe(
      		data => { window.location.reload() }
    	);
  	}

	editPemakaianKamarOperasi(nama: string, pemakaianKamarOperasi: PemakaianKamarOperasi) {
		this.pemakaianKamarOperasiModalNama = nama;
		this.pemakaianKamarOperasiModal = Object.assign({}, pemakaianKamarOperasi);
	}

	updatePemakaianKamarOperasi() {
		this.pemakaianKamarOperasiService.updatePemakaianKamarOperasi(this.pemakaianKamarOperasiModalNama, this.pemakaianKamarOperasiModal).subscribe(
			data => { window.location.reload() }
		);
	}

	destroyPemakaianKamarOperasi(nama: string) {
		this.pemakaianKamarOperasiService.destroyPemakaianKamarOperasi(nama).subscribe(
		data => { window.location.reload() }
		);
	}

	getRecentTransaksi(nama_pasien: string) {
		this.transaksiService.getRecentTransaksi(nama_pasien).
			subscribe(data => {
				this.transaksi = data;
				this.pemakaianKamarOperasiModal.id_transaksi = this.transaksi.id;
			})
	}


//   newpemakaianKamarOperasi() {
//     this.pemakaianKamarOperasiModal = new pemakaianKamarOperasi();
//   }

//   createpemakaianKamarOperasi() {
//     this.pemakaianKamarOperasiService.createpemakaianKamarOperasi(this.pemakaianKamarOperasiModal).subscribe(
//       data => { window.location.reload() }
//     );
//   }

//   editpemakaianKamarOperasi(nama: string, pemakaianKamarOperasi: pemakaianKamarOperasi) {
//     this.pemakaianKamarOperasiModalNama = nama;
//     this.pemakaianKamarOperasiModal = Object.assign({}, pemakaianKamarOperasi);
//   }

//   updatepemakaianKamarOperasi() {
//     this.pemakaianKamarOperasiService.updatepemakaianKamarOperasi(this.pemakaianKamarOperasiModalNama, this.pemakaianKamarOperasiModal).subscribe(
//       data => { window.location.reload() }
//     );
//   }

//   destroypemakaianKamarOperasi(nama: string) {
//     this.pemakaianKamarOperasiService.destroypemakaianKamarOperasi(nama).subscribe(
//       data => { window.location.reload() }
//     );
//   }
}
