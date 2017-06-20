import { Injectable }		from '@angular/core';
import { Headers, Http}		from '@angular/http';
import * as _ from "lodash";
import 'rxjs/add/operator/toPromise';

import { Pasien }	from './pasien';

@Injectable()
export class PasienService {

	//Mock data
	allPasien: Pasien[] = [
		{id: 1, nama: 'Octavianus Markus', tanggal_lahir: '02-07-1990', umur: 26, jender: 'Laki-laki', agama: 'Protestan', alamat: 'Jln.Ayam', kontak: '0987654321'},
		{id: 2, nama: 'Alexander Zucchini', tanggal_lahir: '25-02-1970', umur: 47, jender: 'Laki-laki', agama: 'Katolik', alamat: 'Jln.Sapi', kontak: '0987652131'},
		{id: 3, nama: 'John', tanggal_lahir: '12-03-1983', umur: 34, jender: 'Laki-laki', agama: 'Protestan', alamat: 'Jln.Machan', kontak: '098712321'},
		{id: 4, nama: 'Cliphonse Jo', tanggal_lahir: '12-03-1973', umur: 44, jender: 'Laki-laki', agama: 'Buddha', alamat: 'Jln.Michin', kontak: '09871425321'},
		{id: 5, nama: 'Yngwie Malmsteen', tanggal_lahir: '30-06-1963', umur: 53, jender: 'Laki-laki', agama: 'Katolik', alamat: 'Jln.Musik', kontak: '09871422719'}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPasien(): Promise<Pasien[]> {
		return Promise.resolve(this.allPasien)
			.catch(this.handleError);
	}

	getPasien(key: number): Promise<Pasien> {
		return this.getAllPasien()
			.then(allPasien => allPasien.find(Pasien => Pasien.id === key))
			.catch(this.handleError);
	}

	getPasienByName(key: string): Promise<Pasien[]> {
		return this.getAllPasien()
			.then(allPasien => 
				_.filter(allPasien, pasien => 
					pasien.nama.match(new RegExp(key, 'gi'))
				)
			)
			.catch(this.handleError);
	}
}