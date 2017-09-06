import { Component, OnInit }		from '@angular/core';

import { Rawatinap } 				from './rawatinap';
import { RawatinapService }		    from './rawatinap.service';

@Component({
 	selector: 'rawatinap-pemeriksaan-kamar-list-page',
 	templateUrl: './rawatinap-pemeriksaan-kamar-list.component.html',
 	providers: [RawatinapService]
})

export class PemeriksaanRawatinapKamarListComponent implements OnInit {
	allRawatinap: Rawatinap[];
	allJenis = ['', 'Rawat Inap', 'ICU'];
	allKelas = ['', 'VIP', '1', '2', '3'];

	public kelas;
	public searchParam;
	
	constructor(
		private rawatinapService: RawatinapService
	) {}

	ngOnInit() {
		this.rawatinapService.getAllJenisRawatInap().subscribe(
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