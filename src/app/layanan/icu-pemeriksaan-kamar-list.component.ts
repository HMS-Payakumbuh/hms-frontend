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
	
	public searchParam;
	public kelas;

	constructor(
		private rawatinapService: RawatinapService
	) {}

	ngOnInit() {
		this.rawatinapService.getAllICU().subscribe(
     		data => { this.allRawatinap = data }
    	);
	}
}