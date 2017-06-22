import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Tempattidur }			from './tempattidur';

@Injectable()
export class TempattidurService {
	selectedTempatTidur : number;
	//Mock data
	allTempattidur: Tempattidur[] = [
		{no_kamar: 'Anggrek-001', no_tempat_tidur: 1, status: 0},
		{no_kamar: 'Anggrek-001', no_tempat_tidur: 2, status: 1},
		{no_kamar: 'Anggrek-001', no_tempat_tidur: 3, status: 1},
        {no_kamar: 'Anggrek-001', no_tempat_tidur: 4, status: 1},
		{no_kamar: 'Anggrek-001', no_tempat_tidur: 5, status: 0},
        {no_kamar: 'Anggrek-001', no_tempat_tidur: 6, status: 1},
		{no_kamar: 'Anggrek-002', no_tempat_tidur: 1, status: 0},
		{no_kamar: 'Anggrek-002', no_tempat_tidur: 2, status: 1},
		{no_kamar: 'Anggrek-002', no_tempat_tidur: 3, status: 1},
		{no_kamar: 'Anggrek-002', no_tempat_tidur: 4, status: 0},
		{no_kamar: 'Mawar-001', no_tempat_tidur: 1, status: 1},
		{no_kamar: 'Mawar-001', no_tempat_tidur: 2, status: 0},
		{no_kamar: 'Matahari-001', no_tempat_tidur: 1, status: 0},
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTempattidur(): Promise<Tempattidur[]> {
		return Promise.resolve(this.allTempattidur)
			.catch(this.handleError);
	}

	getTempattidurByNoKamar(no_kamar: string): Promise<Tempattidur[]> {
		return this.getAllTempattidur()
			.then(allTempattidur=> allTempattidur.filter(function(item) {
				return item.no_kamar === no_kamar;
			}))
			.catch(this.handleError);
	}
}