import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Tindakan }								from './tindakan';
import { TindakanReference }			from './tindakan-reference';

@Injectable()
export class TindakanService {

	//Mock data
	allTindakanReference: TindakanReference[] = [
		{kode: '17.11', nama: 'LAP DIR ING HERN-GRAFT', harga: 100000},
		{kode: '17.12', nama: 'LAP INDIR ING HERN-GRAFT', harga: 150000},
		{kode: '17.13', nama: 'LAP ING HERN-GRAFT NOS', harga: 200000}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTindakanReference(): Promise<TindakanReference[]> {
		return Promise.resolve(this.allTindakanReference)
			.catch(this.handleError);
	}

	getPoliklinik(kode: string): Promise<TindakanReference> {
		return this.getAllTindakanReference()
			.then(allTindakanReference => allTindakanReference.find(TindakanReference => TindakanReference.kode === kode))
			.catch(this.handleError);
	}
}