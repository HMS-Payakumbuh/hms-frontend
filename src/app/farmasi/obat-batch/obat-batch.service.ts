import { Injectable }		from '@angular/core';
import { Headers, Http }		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ObatBatch }		from './obat-batch';
// import { ENV }				from '.../environment';

@Injectable()
export class ObatBatchService {
	// private obatBatchUrl = ENV.obatBatchUrl;

	allObatBatch: ObatBatch[] = [
		{kode_obat: 213816091101, id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G610NV', waktu_masuk: new Date('2016-09-11T16:16+07:00'), kadaluarsa: new Date('2017-06-18'), harga_beli: 9180.36, jumlah: 10, lokasi: 'Apotek', keterangan: ''},
		{ kode_obat: 213816091101, id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G610NV', waktu_masuk: new Date('2016-09-11T16:18+07:00'), kadaluarsa: new Date('2017-06-19'), harga_beli: 9180.36, jumlah: 137, lokasi: 'Gudang Utama', keterangan: ''}
	]; // Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatBatch(): Promise<ObatBatch[]> {
		return Promise.resolve(this.allObatBatch)
			.catch(this.handleError);
	}

	getObatBatch(kode_obat: number): Promise<ObatBatch> {
		return this.getAllObatBatch()
			.then(allObatBatch => allObatBatch.find(ObatBatch => ObatBatch.kode_obat === kode_obat))
			.catch(this.handleError);
	}

//	getAllObatBatch(): Promise<ObatBatch[]> {
//		return this.http.get(this.ObatBatchUrl)
//			.toPromise()
//			.then(response => response.json().data as ObatBatch[])
//			.catch(this.handleError);
//	}

//	getObatBatch(id: number): Promise<ObatBatch> {
//		const url = `${this.ObatBatchUrl}/${id}`;
//		return this.http.get(url)
//			.toPromise()
//			.then(response => response.json().data as ObatBatch)
//			.catch(this.handleError);
//	}
}