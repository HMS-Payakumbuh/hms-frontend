import { Injectable }		from '@angular/core';
import { Headers, Http }		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ObatPindah }		from './obat-pindah';
// import { ENV }				from '.../environment';

@Injectable()
export class ObatPindahService {
	// private ObatPindahUrl = ENV.ObatPindahUrl;

	allObatPindah: ObatPindah[] = [
		{id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G611NV', waktu_masuk: '11 September 2016 16:18', kadaluarsa: '19 Juni 2017', harga_beli: 9180.36, kode_obat: 213816091102, waktu_keluar: '12 Juni 2017 08:33', jumlah: 5, asal: 'Gudang Utama', tujuan: 'Apotek', keterangan: ''},
		{id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G610NV', waktu_masuk: '11 September 2016 16:16', kadaluarsa: '18 Juni 2017', harga_beli: 9180.36, kode_obat: 213816091101, waktu_keluar: '19 Juni 2017 09:48', jumlah: 37, asal: 'Apotek', tujuan: 'Gudang Utama', keterangan: ''}
	]; // Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatPindah(): Promise<ObatPindah[]> {
		return Promise.resolve(this.allObatPindah)
			.catch(this.handleError);
	}

	getObatPindah(waktu_keluar: string): Promise<ObatPindah> {
		return this.getAllObatPindah()
			.then(allObatPindah => allObatPindah.find(ObatPindah => ObatPindah.waktu_keluar === waktu_keluar))
			.catch(this.handleError);
	}

//	getAllObatPindah(): Promise<ObatPindah[]> {
//		return this.http.get(this.ObatPindahUrl)
//			.toPromise()
//			.then(response => response.json().data as ObatPindah[])
//			.catch(this.handleError);
//	}

//	getObatPindah(id: number): Promise<ObatPindah> {
//		const url = `${this.ObatPindahUrl}/${id}`;
//		return this.http.get(url)
//			.toPromise()
//			.then(response => response.json().data as ObatPindah)
//			.catch(this.handleError);
//	}
}