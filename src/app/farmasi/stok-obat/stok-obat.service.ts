import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { StokObat }		from './stok-obat';
import { ENV }			from '../../environment';

@Injectable()
export class StokObatService {
	private stokObatUrl = ENV.stokObatUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllStokObat(): Observable<StokObat[]> {
		return this.authHttp.get(this.stokObatUrl)
			.map((res: Response) => res.json());
	}

	getStokObat(id: number): Observable<StokObat> {
		return this.getAllStokObat()
			.map(allStokObat => allStokObat.find(stok_obat => stok_obat.id == id));
	}

	getStokObatByLocation(lokasi: number): Observable<StokObat[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('lokasi', ''+lokasi);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.stokObatUrl+'/search_by_location', requestOptions)
		    .map((res: Response) => res.json());			
	}

	getStokObatByLocationType(jenis_lokasi: number): Observable<StokObat[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('jenis_lokasi', ''+jenis_lokasi);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.stokObatUrl+'/search_by_location_type', requestOptions)
		    .map((res: Response) => res.json());			
	}

	createStokObat(stokObat: StokObat) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(stokObat);
    	return this.authHttp.post(this.stokObatUrl, body, options ).map((res: Response) => res.json());
	}
	
	getStokObatByJenisObatAndBatch(id_jenis_obat: number, nomor_batch: string, jenis_lokasi: number): Observable<StokObat> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_jenis_obat', ''+id_jenis_obat);		
		params.set('nomor_batch', nomor_batch);	
		params.set('jenis_lokasi', ''+jenis_lokasi);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.stokObatUrl+'/search_by_jenis_obat_and_batch', requestOptions)
		    .map((res: Response) => res.json());			
	}	
}