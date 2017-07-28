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
		return this.http.get(this.tenagaMedisUrl + '/' + no_pegawai)
			.map((res: Response) => res.json());
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

	getAllDokter(): Observable<Dokter[]> {
		return this.http.get(this.dokterUrl)
			.map((res: Response) => res.json());
	}

	getDokter(noPegawai: string): Observable<Dokter> {
		return this.http.get(this.dokterUrl + '/' + noPegawai)
			.map((res: Response) => res.json());
	}

	getAllJadwalDokter(): Observable<JadwalDokter[]> {
		return this.http.get(this.jadwalDokterUrl)
			.map((res: Response) => res.json());
	}

	getAllAvailableJadwalDokter(nama_poli: string): Observable<JadwalDokter[]> {
		return this.http.get(this.jadwalDokterUrl + '/' + nama_poli)
			.map((res: Response) => res.json());
	}

	createJadwalDokter(jadwalDokter: JadwalDokter) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(jadwalDokter);

		return this.http.post(this.jadwalDokterUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateJadwalDokter(nama_poli: string, np_dokter: string, tanggal: string, jadwalDokter: JadwalDokter) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(jadwalDokter);

		return this.http.put(this.jadwalDokterUrl + '/' + nama_poli + '/' + np_dokter + '/' + tanggal, body, options)
			.map((res: Response) => res.json());
	}

	destroyJadwalDokter(nama_poli: string, np_dokter: string, tanggal: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.jadwalDokterUrl + '/' + nama_poli + '/' + np_dokter + '/' + tanggal, options)
			.map((res: Response) => res.json());
	}

	periksa(request: any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(request);

		return this.http.post(this.dokterUrl + '/periksa', body, options)
			.map((res: Response) => res.json());
	}
}
