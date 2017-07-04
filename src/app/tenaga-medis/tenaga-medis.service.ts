import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { Dokter }					from './dokter';
import { JadwalDokter }		from './jadwal-dokter';
import { TenagaMedis }		from './tenaga-medis';

import * as _ from "lodash";

@Injectable()
export class TenagaMedisService {
	private tenagaMedisUrl = ENV.tenagaMedisUrl;
	private dokterUrl = ENV.dokterUrl;
	private jadwalDokterUrl = ENV.jadwalDokterUrl;

	allJadwalDokter: JadwalDokter[] = [
		{nama_poliklinik: 'Poli Umum', id_dokter: 1, nama_dokter: 'Calvin', tanggal:'22/06/2017', waktu_mulai_praktik:'09:00', waktu_selesai_praktik:'15:00'},
		{nama_poliklinik: 'Poli Umum', id_dokter: 1, nama_dokter: 'Calvin', tanggal:'23/06/2017', waktu_mulai_praktik:'09:00', waktu_selesai_praktik:'15:00'},
		{nama_poliklinik: 'Poli THT', id_dokter: 2, nama_dokter: 'Aditya', tanggal:'22/06/2017', waktu_mulai_praktik:'09:00', waktu_selesai_praktik:'13:00'}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTenagaMedis(): Observable<TenagaMedis[]> {
		return this.http.get(this.tenagaMedisUrl)
			.map((res: Response) => res.json());
	}

	getTenagaMedis(no_pegawai: string): Observable<TenagaMedis> {
		return this.getAllTenagaMedis()
			.map(allTenagaMedis => allTenagaMedis.find(tenagaMedis => tenagaMedis.no_pegawai === no_pegawai));
	}

	createTenagaMedis(tenagaMedis: TenagaMedis) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(tenagaMedis);

		return this.http.post(this.tenagaMedisUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateTenagaMedis(no_pegawai: string, tenagaMedis: TenagaMedis) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(tenagaMedis);

		return this.http.put(this.tenagaMedisUrl + '/' + no_pegawai, body, options)
			.map((res: Response) => res.json());
	}

	destroyTenagaMedis(no_pegawai: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.tenagaMedisUrl + '/' + no_pegawai, options)
			.map((res: Response) => res.json());
	}

	getAllJadwalDokter(): Observable<JadwalDokter[]> {
		return this.http.get(this.jadwalDokterUrl)
			.map((res: Response) => res.json());
	}

	getAllAvailableJadwalDokter(nama_poli: string): Observable<JadwalDokter[]> {
		return this.getAllJadwalDokter()
			.map(allJadwalDokter => _.filter(_.uniqBy(allJadwalDokter, 'nama_poli'), {nama_poli: nama_poli}));
	}
}
