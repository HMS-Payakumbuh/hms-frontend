import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { PemakaianKamar }			from './pemakaian-kamar';
import { Transaksi }			from '../transaksi/transaksi';

@Injectable()
export class PemakaianKamarService {
	rawatinapUrl = ENV.rawatinapUrl;
	jasaDokterRawatinapUrl = ENV.jasaDokterRawatinapUrl;
	pemakaianKamarRawatinapUrl = ENV.pemakaianKamarRawatinapUrl;
	transaksiUrl = ENV.transaksiUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getJasaDokterRawatinap(no_pegawai: string): Observable<any[]> {
		return this.http.get(this.jasaDokterRawatinapUrl + '/' + no_pegawai)
			.map((res: Response) => res.json());
	}

	getJasaDokterRawatinapById(idPemakaian:number): Observable<any[]> {
		return this.http.get(this.jasaDokterRawatinapUrl + '/pemakaian/' + idPemakaian)
			.map((res: Response) => res.json());
	}

	createJasaDokterRawatinap(addedDokter: any, idPemakaian: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(addedDokter);
		return this.http.post(this.jasaDokterRawatinapUrl + '/' + idPemakaian , body, options)
			.map((res: Response) => res.json());
	}

	deleteJasaDokterRawatinap(id:number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.jasaDokterRawatinapUrl + '/' + id, options)
			.map((res: Response) => res.json());
	}

	getAllPemakaianKamar(): Observable<PemakaianKamar[]> {
		return this.http.get(this.pemakaianKamarRawatinapUrl)
			.map((res: Response) => res.json());
	}

	getAllPemakaianKamarRawatinapByNoPegawai(no_pegawai: string): Observable<PemakaianKamar[]> {
		return this.getAllPemakaianKamar()
			.map(allPemakaian => allPemakaian.filter(pemakaian => pemakaian.jenis_kamar == "Rawat Inap" && pemakaian.no_pegawai == no_pegawai))
	}
	
	getAllPemakaianKamarICUByNoPegawai(no_pegawai: string): Observable<PemakaianKamar[]> {
		return this.getAllPemakaianKamar()
			.map(allPemakaian => allPemakaian.filter(pemakaian => pemakaian.jenis_kamar == "ICU" && pemakaian.no_pegawai == no_pegawai))
	}

	getAllPemakaianKamarRawatinap(): Observable<PemakaianKamar[]> {
		return this.getAllPemakaianKamar()
			.map(allPemakaian => allPemakaian.filter(pemakaian => pemakaian.jenis_kamar == "Rawat Inap"))
	}
		
	getAllPemakaianKamarICU(): Observable<PemakaianKamar[]> {
		return this.getAllPemakaianKamar()
			.map(allPemakaian => allPemakaian.filter(pemakaian => pemakaian.jenis_kamar == "ICU"))
	}

	getAllPemakaianKamarByNoKamar(no_kamar:string): Observable<PemakaianKamar[]> {
		return this.http.get(this.pemakaianKamarRawatinapUrl + "/now/" + no_kamar)
			.map((res: Response) => res.json());
	}

	getAllPemakaianKamarRawatinapByNoKamarAndNoPegawai(no_kamar:string, no_pegawai: string): Observable<PemakaianKamar[]> {
		return this.getAllPemakaianKamarByNoKamar(no_kamar)
			.map(allPemakaian => allPemakaian.filter(pemakaian => pemakaian.jenis_kamar == "Rawat Inap" && pemakaian.no_pegawai == no_pegawai))
	}

	getAllPemakaianKamarICUByNoKamarAndNoPegawai(no_kamar:string, no_pegawai: string): Observable<PemakaianKamar[]> {
		return this.getAllPemakaianKamarByNoKamar(no_kamar)
			.map(allPemakaian => allPemakaian.filter(pemakaian => pemakaian.jenis_kamar == "ICU" && pemakaian.no_pegawai == no_pegawai))
	}
	
	getDaftarPemakaianKamarBooked(): Observable<PemakaianKamar[]> {
		return this.http.get(this.pemakaianKamarRawatinapUrl + '/search' + '/booked')
			.map((res: Response) => res.json());
	}

	getAllPemakaianKamarBooked(no_kamar: string): Observable<PemakaianKamar[]> {
		return this.http.get(this.pemakaianKamarRawatinapUrl + '/search' + '/booked/' + no_kamar)
			.map((res: Response) => res.json());
	}

	getAllPemakaianKamarBookedWithTanggal(tanggal: string, no_kamar: string): Observable<PemakaianKamar[]> {
		return this.http.get(this.pemakaianKamarRawatinapUrl + '/search' + '/booked/' + tanggal + '/' + no_kamar)
			.map((res: Response) => res.json());
	}

	getPemakaianKamar(id: number): Observable<PemakaianKamar> {
		return this.http.get(this.pemakaianKamarRawatinapUrl + '/' + id)
			.map((res: Response) => res.json());
	}

	getNoTransaksi(nama_pasien: string, no_kamar : string): Observable<Transaksi> {
		return this.http.get(this.transaksiUrl + '/' + no_kamar)
			.map((res: Response) => res.json());
	}

	createPemakaianKamar(no_kamar : string, PemakaianKamar: PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.post(this.rawatinapUrl + '/' + no_kamar, body, options)
			.map((res: Response) => res.json());
	}

	createBookedKamar(tanggal: string, PemakaianKamar: PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.post(this.pemakaianKamarRawatinapUrl + '/booking/' +  tanggal, body, options)
			.map((res: Response) => res.json());
	}

	updatePemakaianKamar(id: number, no_kamar:string, no_tempat_tidur:number, PemakaianKamar: PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.put(this.pemakaianKamarRawatinapUrl+ '/' + id + '/' + no_kamar + '/' + no_tempat_tidur, body, options)
			.map((res: Response) => res.json());
	}

	masukBookingKamar(id:number, PemakaianKamar:PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.put(this.rawatinapUrl+ '/booking/' + id, body, options)
			.map((res: Response) => res.json());
	}

	perbaruiWaktuKeluarPemakaianKamar(id: number, PemakaianKamar: PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.put(this.pemakaianKamarRawatinapUrl+ '/update/rawatinap/waktu_keluar/' + id, body, options)
	}

	tambahDurasiPemakaianVentilator(id: number, PemakaianKamar: PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.put(this.pemakaianKamarRawatinapUrl+ '/update/rawatinap/ventilator/icu/' + id, body, options)
	}


	pindahPemakaianKamar(id: number, PemakaianKamar: PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.put(this.pemakaianKamarRawatinapUrl+ '/pindah/' + id, body, options)
	}

	destroyPemakaianKamar(id: number, no_kamar:string, no_tempat_tidur:number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.pemakaianKamarRawatinapUrl + '/' + id + '/' + no_kamar + '/' + no_tempat_tidur, options)
			.map((res: Response) => res.json());
	}

	destroyBookingKamar(id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.pemakaianKamarRawatinapUrl + '/booking/' + id, options)
			.map((res: Response) => res.json());
	}
}