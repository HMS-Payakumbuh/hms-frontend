import { Injectable }		from '@angular/core';
import { Headers, Http }		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ObatRusak }		from './obat-rusak';
// import { ENV }				from '.../environment';

@Injectable()
export class ObatRusakService {
	// private ObatRusakUrl = ENV.ObatRusakUrl;

	allObatRusak: ObatRusak[] = [
		{id: 1, id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G611NV', waktu_masuk: '11 September 2016 16:18', kadaluarsa: '19 Juni 2017', harga_beli: 9180.36, kode_obat: 213816091102, waktu_keluar: '12 Juni 2017 08:33', jumlah: 5, alasan: 'Rusak', keterangan: 'Segel rusak'},
		{id: 2, id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G610NV', waktu_masuk: '11 September 2016 16:16', kadaluarsa: '18 Juni 2017', harga_beli: 9180.36, kode_obat: 213816091101, waktu_keluar: '19 Juni 2017 09:48', jumlah: 37, alasan: 'Kadaluarsa', keterangan: ''}
	]; // Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatRusak(): Promise<ObatRusak[]> {
		return Promise.resolve(this.allObatRusak)
			.catch(this.handleError);
	}

	getObatRusak(id: number): Promise<ObatRusak> {
		return this.getAllObatRusak()
			.then(allObatRusak => allObatRusak.find(ObatRusak => ObatRusak.id === id))
			.catch(this.handleError);
	}

//	getAllObatRusak(): Promise<ObatRusak[]> {
//		return this.http.get(this.ObatRusakUrl)
//			.toPromise()
//			.then(response => response.json().data as ObatRusak[])
//			.catch(this.handleError);
//	}

//	getObatRusak(id: number): Promise<ObatRusak> {
//		const url = `${this.ObatRusakUrl}/${id}`;
//		return this.http.get(url)
//			.toPromise()
//			.then(response => response.json().data as ObatRusak)
//			.catch(this.handleError);
//	}
}