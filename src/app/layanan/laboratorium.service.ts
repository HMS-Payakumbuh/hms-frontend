import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Laboratorium }			from './laboratorium';

@Injectable()
export class LaboratoriumService {

	//Mock data
	allLaboratorium: Laboratorium[] = [
		{nama: 'Lab Hematologi Rutin', kategori_antrian: 'C'},
		{nama: 'Lab Immunologi', kategori_antrian: 'C'},
		{nama: 'Lab Mikrobiologi', kategori_antrian: 'C'}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllLaboratorium(): Promise<Laboratorium[]> {
		return Promise.resolve(this.allLaboratorium)
			.catch(this.handleError);
	}

	getLaboratorium(nama: string): Promise<Laboratorium> {
		return this.getAllLaboratorium()
			.then(allLaboratorium => allLaboratorium.find(laboratorium => laboratorium.nama === nama))
			.catch(this.handleError);
	}
}