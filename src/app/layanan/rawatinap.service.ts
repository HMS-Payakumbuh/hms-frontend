import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Rawatinap }			from './rawatinap';

@Injectable()
export class RawatinapService {

	//Mock data
	allRawatinap: Rawatinap[] = [
		{no_kamar: 'Anggrek-001', jenis_kamar: 'Rawat Inap', kelas: '3', harga_per_hari: 100, kapasitas_kamar: 2},
		{no_kamar: 'Anggrek-002', jenis_kamar: 'ICU', kelas : '2', harga_per_hari: 100, kapasitas_kamar: 2},
		{no_kamar: 'Mawar-001', jenis_kamar: 'Rawat Inap', kelas : '1', harga_per_hari: 40, kapasitas_kamar: 2},
		{no_kamar: 'Matahari-001', jenis_kamar: 'Rawat Inap', kelas : 'VIP', harga_per_hari: 400, kapasitas_kamar: 2}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllRawatinap(): Promise<Rawatinap[]> {
		return Promise.resolve(this.allRawatinap)
			.catch(this.handleError);
	}

	getRawatinapByNoKamar(no_kamar: string) : Promise<Rawatinap> {
		return this.getAllRawatinap()
			.then(allRawatinap => allRawatinap.find(rawatinap => rawatinap.no_kamar === no_kamar))
			.catch(this.handleError);
	}

	getRawatinapByJenisKamar(jenis_kamar: string): Promise<Rawatinap> {
		return this.getAllRawatinap()
			.then(allRawatinap => allRawatinap.find(rawatinap => rawatinap.jenis_kamar === jenis_kamar))
			.catch(this.handleError);
	}

    getRawatinapByKelas(kelas: string): Promise<Rawatinap> {
		return this.getAllRawatinap()
			.then(allRawatinap => allRawatinap.find(rawatinap => rawatinap.kelas === kelas))
			.catch(this.handleError);
	}

    getAvailableRawatinap(): Promise<Rawatinap> {
		return this.getAllRawatinap()
			.then(allRawatinap => allRawatinap.find(rawatinap => rawatinap.kapasitas_kamar > 0))
			.catch(this.handleError);
	}
}