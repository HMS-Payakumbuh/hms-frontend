import { Injectable }		from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Antrian }	from './antrian';

import * as _ from "lodash";

@Injectable()
export class AntrianService {

	//Mock data
	/*allAntrian: Antrian[] = [
      {id_transaksi: 1, nama_layanan: 'FrontOffice', waktu_masuk_antrian:'09:15:15', jenis: 'umum', no_antrian: 1, nama_pasien: 'Jonathan', status: 'open' },
      {id_transaksi: 2, nama_layanan: 'FrontOffice', waktu_masuk_antrian:'09:15:45', jenis: 'umum', no_antrian: 2, nama_pasien: 'Ben Lemuel', status: 'open' },
      {id_transaksi: 3, nama_layanan: 'FrontOffice', waktu_masuk_antrian:'09:16:15', jenis: 'umum', no_antrian: 3, nama_pasien: 'Fiqie', status: 'open' },
      {id_transaksi: 4, nama_layanan: 'FrontOffice', waktu_masuk_antrian:'09:15:15', jenis: 'khusus', no_antrian: 4, nama_pasien: 'Al Ex', status: 'open' },
      {id_transaksi: 5, nama_layanan: 'FrontOffice', waktu_masuk_antrian:'09:15:45', jenis: 'khusus', no_antrian: 5, nama_pasien: 'Hu Wan', status: 'open' },
      {id_transaksi: 6, nama_layanan: 'FrontOffice', waktu_masuk_antrian:'09:16:15', jenis: 'khusus', no_antrian: 6, nama_pasien: 'Gunawan', status: 'open' },
	];*/

	allAntrian: Antrian[] = [
      {id_transaksi: 1, nama_layanan: 'Anak', waktu_masuk_antrian:'09:15:15', jenis: 'umum', no_antrian: 1, nama_pasien: 'Jonathan', status: 'open' },
      {id_transaksi: 2, nama_layanan: 'Anak', waktu_masuk_antrian:'09:15:45', jenis: 'umum', no_antrian: 2, nama_pasien: 'Ben Lemuel', status: 'open' },
      {id_transaksi: 3, nama_layanan: 'Anak', waktu_masuk_antrian:'09:16:15', jenis: 'umum', no_antrian: 3, nama_pasien: 'Fiqie', status: 'open' },
      {id_transaksi: 4, nama_layanan: 'Anak', waktu_masuk_antrian:'09:15:15', jenis: 'khusus', no_antrian: 4, nama_pasien: 'Al Ex', status: 'open' },
      {id_transaksi: 5, nama_layanan: 'Anak', waktu_masuk_antrian:'09:15:45', jenis: 'khusus', no_antrian: 5, nama_pasien: 'Hu Wan', status: 'open' },
      {id_transaksi: 6, nama_layanan: 'Anak', waktu_masuk_antrian:'09:16:15', jenis: 'khusus', no_antrian: 6, nama_pasien: 'Gunawan', status: 'open' },
      {id_transaksi: 7, nama_layanan: 'Umum', waktu_masuk_antrian:'09:15:15', jenis: 'umum', no_antrian: 7, nama_pasien: 'Nathan', status: 'open' },
      {id_transaksi: 8, nama_layanan: 'Umum', waktu_masuk_antrian:'09:15:45', jenis: 'umum', no_antrian: 8, nama_pasien: 'Benita', status: 'open' },
      {id_transaksi: 9, nama_layanan: 'Umum', waktu_masuk_antrian:'09:16:15', jenis: 'umum', no_antrian: 9, nama_pasien: 'Fikri', status: 'open' },
      {id_transaksi: 10, nama_layanan: 'Umum', waktu_masuk_antrian:'09:15:15', jenis: 'khusus', no_antrian: 10, nama_pasien: 'Al El', status: 'open' },
      {id_transaksi: 11, nama_layanan: 'Umum', waktu_masuk_antrian:'09:15:45', jenis: 'khusus', no_antrian: 11, nama_pasien: 'Ju Wan', status: 'open' },
      {id_transaksi: 12, nama_layanan: 'Umum', waktu_masuk_antrian:'09:16:15', jenis: 'khusus', no_antrian: 12, nama_pasien: 'Sunawan', status: 'open' },
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllAntrian(): Promise<Antrian[]> {
		return Promise.resolve(this.allAntrian)
			.catch(this.handleError);
	}

	getAntrian(nama: string): Promise<Antrian[]> {
		return this.getAllAntrian()
			.then(allAntrian => 
				_.filter(allAntrian, {nama_layanan: nama})
			)
			.catch(this.handleError);
	}
}