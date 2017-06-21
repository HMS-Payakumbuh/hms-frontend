import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PemakaianKamarOperasi }			from './pemakaian-kamar-operasi';

@Injectable()
export class PemakaianKamarOperasiService {

	//Mock data
	allPemakaianKamarOperasi: PemakaianKamarOperasi[] = [
		{no_kamar: 'Operasi-001', waktu_masuk: new Date('2017-09-11T16:00+07:00'), waktu_keluar: new Date('2017-09-11T18:00+07:00'), no_tindakan: 1},
		{no_kamar: 'Operasi-002', waktu_masuk: new Date('2017-09-11T16:00+07:00'), waktu_keluar: new Date('2017-09-11T18:00+07:00'), no_tindakan: 1},
		{no_kamar: 'Operasi-003', waktu_masuk: new Date('2017-09-11T16:00+07:00'), waktu_keluar: new Date('2017-09-11T18:00+07:00'), no_tindakan: 1},
		{no_kamar: 'Operasi-004', waktu_masuk: new Date('2017-09-11T16:00+07:00'), waktu_keluar: new Date('2017-09-11T18:00+07:00'), no_tindakan: 1}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPemakaianKamarOperasi(): Promise<PemakaianKamarOperasi[]> {
		return Promise.resolve(this.allPemakaianKamarOperasi)
			.catch(this.handleError);
	}

}