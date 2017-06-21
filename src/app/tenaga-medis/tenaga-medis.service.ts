import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Dokter }					from './dokter';
import { TenagaMedis }		from './tenaga-medis';

@Injectable()
export class TenagaMedisService {

	//Mock data
	allTenagaMedis: TenagaMedis[] = [
		{id: 1, nama: 'Calvin', jabatan: 'Dokter'},
		{id: 2, nama: 'Aditya', jabatan: 'Dokter'},
		{id: 3, nama: 'Jonathan', jabatan: 'Petugas Lab'}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTenagaMedis(): Promise<TenagaMedis[]> {
		return Promise.resolve(this.allTenagaMedis)
			.catch(this.handleError);
	}

	getTenagaMedis(id: number): Promise<TenagaMedis> {
		return this.getAllTenagaMedis()
			.then(allTenagaMedis => allTenagaMedis.find(tenagaMedis => tenagaMedis.id === id))
			.catch(this.handleError);
	}
}