import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Dokter }					from './dokter';
import { JadwalDokter }		from './jadwal-dokter';
import { TenagaMedis }		from './tenaga-medis';

@Injectable()
export class TenagaMedisService {

	//Mock data
	allTenagaMedis: TenagaMedis[] = [
		{id: 1, nama: 'Calvin', jabatan: 'Dokter'},
		{id: 2, nama: 'Aditya', jabatan: 'Dokter'},
		{id: 3, nama: 'Jonathan', jabatan: 'Petugas Lab'}
	];

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

	getAllTenagaMedis(): Promise<TenagaMedis[]> {
		return Promise.resolve(this.allTenagaMedis)
			.catch(this.handleError);
	}

	getTenagaMedis(id: number): Promise<TenagaMedis> {
		return this.getAllTenagaMedis()
			.then(allTenagaMedis => allTenagaMedis.find(tenagaMedis => tenagaMedis.id === id))
			.catch(this.handleError);
	}

	getAllJadwalDokter(): Promise<JadwalDokter[]> {
		return Promise.resolve(this.allJadwalDokter)
			.catch(this.handleError);
	}
}