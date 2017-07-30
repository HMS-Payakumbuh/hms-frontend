import { Component, OnInit }		from '@angular/core';

import { Rawatinap } 				from './rawatinap';
import { RawatinapService }		    from './rawatinap.service';

@Component({
 	selector: 'icu-pemeriksaan-kamar-list-page',
 	templateUrl: './icu-pemeriksaan-kamar-list.component.html',
 	providers: [RawatinapService]
})

export class PemeriksaanICUKamarListComponent implements OnInit {
	allRawatinap: Rawatinap[];
	allJenis = ['', 'Rawat Inap', 'ICU'];
	allKelas = ['', 'VIP', '1', '2', '3'];
	
	constructor(
		private rawatinapService: RawatinapService
	) {}

	ngOnInit() {
		this.rawatinapService.getAllICU().subscribe(
     		data => { this.allRawatinap = data }
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