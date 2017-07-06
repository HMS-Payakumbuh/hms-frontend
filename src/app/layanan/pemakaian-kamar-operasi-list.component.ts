import { Component, OnInit }		from '@angular/core';
import * as _ from "lodash";

import { PemakaianKamarOperasi } 				from './pemakaian-kamar-operasi';
import { PemakaianKamarOperasiService }		    from './pemakaian-kamar-operasi.service';
import { TenagaMedis } 				from '../tenaga-medis/tenaga-medis';
import { TenagaMedisService }		    from '../tenaga-medis/tenaga-medis.service';
import { Tindakan } 				from './tindakan';
import { TindakanService }		    from './tindakan.service';

@Component({
 	selector: 'pemakaian-kamar-operasi-list-page',
 	templateUrl: './pemakaian-kamar-operasi-list.component.html',
 	providers: [PemakaianKamarOperasiService, TenagaMedisService, TindakanService]
})

export class PemakaianKamarOperasiListComponent implements OnInit {
	allPemakaianKamarOperasi: PemakaianKamarOperasi[];
	allTenagaMedis: TenagaMedis[];
	allJenis = ['', 'Rawat Inap', 'ICU'];
	allKelas = ['', 'VIP', '1', '2', '3'];
	pemakaianKamarOperasiModal: PemakaianKamarOperasi = null;
    pemakaianKamarOperasiModalNama: string = null;

	constructor(
		private pemakaianKamarOperasiService: PemakaianKamarOperasiService,
		private tenagaMedisService: TenagaMedisService,
		private tindakanService: TindakanService
	) {}

	ngOnInit() {
		this.pemakaianKamarOperasiService.getAllPemakaianKamarOperasi().subscribe(
     		data => { this.allPemakaianKamarOperasi = data }
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
//   newPoliklinik() {
//     this.poliklinikModal = new Poliklinik();
//   }

//   createPoliklinik() {
//     this.poliklinikService.createPoliklinik(this.poliklinikModal).subscribe(
//       data => { window.location.reload() }
//     );
//   }

//   editPoliklinik(nama: string, poliklinik: Poliklinik) {
//     this.poliklinikModalNama = nama;
//     this.poliklinikModal = Object.assign({}, poliklinik);
//   }

//   updatePoliklinik() {
//     this.poliklinikService.updatePoliklinik(this.poliklinikModalNama, this.poliklinikModal).subscribe(
//       data => { window.location.reload() }
//     );
//   }

//   destroyPoliklinik(nama: string) {
//     this.poliklinikService.destroyPoliklinik(nama).subscribe(
//       data => { window.location.reload() }
//     );
//   }
}
