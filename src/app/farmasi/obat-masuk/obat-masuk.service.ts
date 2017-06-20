import { Injectable }		from '@angular/core';
import { Headers, Http }		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ObatMasuk }		from './obat-masuk';
// import { ENV }				from '.../environment';

@Injectable()
export class ObatMasukService {
	// private obatBatchUrl = ENV.obatBatchUrl;

	allObatMasuk: ObatMasuk[] = [
		{kode_obat: 213816091101, id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G610NV', waktu_masuk: new Date('2016-09-11T16:16+07:00'), kadaluarsa: new Date('2017-06-18'), harga_beli: 9180.36, jumlah: 10, keterangan: ''},
		{ kode_obat: 213816091102, id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G611NV', waktu_masuk: new Date('2016-09-11T16:18+07:00'), kadaluarsa: new Date('2017-06-19'), harga_beli: 9180.36, jumlah: 137, keterangan: ''}
	]; // Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatMasuk(): Promise<ObatMasuk[]> {
		return Promise.resolve(this.allObatMasuk)
			.catch(this.handleError);
	}

	getObatMasuk(kode_obat: number): Promise<ObatMasuk> {
		return this.getAllObatMasuk()
			.then(allObatMasuk => allObatMasuk.find(ObatMasuk => ObatMasuk.kode_obat === kode_obat))
			.catch(this.handleError);
	}

//	getAllObatMasuk(): Promise<ObatMasuk[]> {
//		return this.http.get(this.ObatMasukUrl)
//			.toPromise()
//			.then(response => response.json().data as ObatMasuk[])
//			.catch(this.handleError);
//	}

//	getObatMasuk(id: number): Promise<ObatMasuk> {
//		const url = `${this.ObatMasukUrl}/${id}`;
//		return this.http.get(url)
//			.toPromise()
//			.then(response => response.json().data as ObatMasuk)
//			.catch(this.handleError);
//	}
}