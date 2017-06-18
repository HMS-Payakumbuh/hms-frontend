import { Component } from '@angular/core';

import { ObatPindah }			from './obat-pindah';
import { ObatPindahService }		from './obat-pindah.service';

@Component({
 	selector: 'daftar-obat-pindah-page',
 	templateUrl: './daftar-obat-pindah.component.html',
 	providers: [ObatPindahService]
})

export class DaftarObatPindahComponent {

	allObatPindah: ObatPindah[];

	constructor(
		private ObatPindahService: ObatPindahService
	) {}

	ngOnInit(): void {
		this.ObatPindahService.getAllObatPindah()
			.then(allObatPindah => this.allObatPindah = allObatPindah);
	}
}