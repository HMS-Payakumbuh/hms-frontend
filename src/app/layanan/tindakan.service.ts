import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }										from '../environment';
import { Transaksi }							from '../transaksi/transaksi';
import { Tindakan }								from './tindakan';
import { TindakanReference }			from './tindakan-reference';

@Injectable()
export class TindakanService {
	private tindakanReferenceUrl = ENV.tindakanReferenceUrl;
	private tindakanUrl = ENV.tindakanUrl;

	tindakan: Tindakan;
	tindakanInstances: Tindakan[] = [];
	i: number;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTindakanReference(): Observable<TindakanReference[]> {
		return this.http.get(this.tindakanReferenceUrl)
			.map((res: Response) => res.json());
	}

	getTindakanReference(kode: string): Observable<TindakanReference> {
		return this.getAllTindakanReference()
			.map(allTindakanReference => allTindakanReference.find(tindakanReference => tindakanReference.kode == kode));
	}

	createTindakanReference(tindakanReference: TindakanReference) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(tindakanReference);
		return this.http.post(this.tindakanReferenceUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateTindakanReference(kode: string, tindakanReference: TindakanReference) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(tindakanReference);
		return this.http.put(this.tindakanReferenceUrl + '/' + kode, body, options)
			.map((res: Response) => res.json());
	}

	destroyTindakanReference(kode: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		return this.http.delete(this.tindakanReferenceUrl + '/' + kode, options)
			.map((res: Response) => res.json());
	}

	saveTindakan (
		transaksi: Transaksi,
		namaLayanan: string,
		isPoli: boolean,
		dokumenPenunjang: number,
		selectedTindakan: TindakanReference[],
		keteranganTindakan: string[]
	) {
		this.i = 0;
		this.tindakanInstances.length = 0;

		for (let tindakanReference of selectedTindakan) {
			this.i++;

			this.tindakan = new Tindakan();
			this.tindakan.no_transaksi = transaksi.id;
			this.tindakan.no_tindakan = this.i;
			this.tindakan.harga = tindakanReference.harga;

			if (isPoli) {
				this.tindakan.nama_poli = namaLayanan;
				this.tindakan.nama_lab = null;
				this.tindakan.nama_ambulans = null;
				this.tindakan.dokumen_penunjang = null;
			}
			else {
				this.tindakan.nama_poli = null;
				this.tindakan.nama_lab = namaLayanan;
				this.tindakan.nama_ambulans = null;
				this.tindakan.dokumen_penunjang = dokumenPenunjang;
			}

			this.tindakan.keterangan = keteranganTindakan[this.i - 1];
			this.tindakan.id_pembayaran = null;
			this.tindakan.kode_tindakan = tindakanReference.kode;
			this.tindakan.id_pasien = transaksi.id_pasien;
			this.tindakan.tanggal_waktu = '2017-07-04 10:00:00';
			this.tindakan.np_tenaga_medis = '101';

			this.tindakanInstances.push(this.tindakan);
		}

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(this.tindakanInstances);
		return this.http.post(this.tindakanUrl, body, options)
			.map((res: Response) => res.json());
	}
}
