import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Poliklinik }			from './poliklinik';

@Injectable()
export class PoliklinikService {

	//Mock data
	allPoliklinik: Poliklinik[] = [
		{nama: 'Poli Umum', kategori_antrian: 'A', kapasitas_pelayanan: 100, sisa_pelayanan: 100, id_lokasi: 1},
		{nama: 'Poli THT', kategori_antrian: 'B', kapasitas_pelayanan: 100, sisa_pelayanan: 100, id_lokasi: 2},
		{nama: 'Poli Jantung', kategori_antrian: 'B', kapasitas_pelayanan: 40, sisa_pelayanan: 40, id_lokasi: 3}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPoliklinik(): Promise<Poliklinik[]> {
		return Promise.resolve(this.allPoliklinik)
			.catch(this.handleError);
	}

	getPoliklinik(nama: string): Promise<Poliklinik> {
		return this.getAllPoliklinik()
			.then(allPoliklinik => allPoliklinik.find(poliklinik => poliklinik.nama === nama))
			.catch(this.handleError);
	}
}