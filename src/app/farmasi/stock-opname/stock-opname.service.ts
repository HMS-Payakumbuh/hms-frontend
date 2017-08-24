import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { StockOpname }		from './stock-opname';
import { ENV }				from '../../environment';

@Injectable()
export class StockOpnameService {
	private stockOpnameUrl = ENV.stockOpnameUrl;
	
	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllStockOpname(): Observable<StockOpname[]> {
		return this.http.get(this.stockOpnameUrl)
			.map((res: Response) => res.json());
	}

	getStockOpname(id: number): Observable<StockOpname> {
		return this.getAllStockOpname()
			.map(allStockOpname => allStockOpname.find(stock_opname => stock_opname.id == id));
	}

	getStockOpnameByLocation(lokasi: number): Observable<StockOpname[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('lokasi', ''+lokasi);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(this.stockOpnameUrl+'/search_by_location', requestOptions)
		    .map((res: Response) => res.json());			
	}

	getLatestStockOpnameByLocation(lokasi: number): Observable<StockOpname> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('lokasi', ''+lokasi);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(this.stockOpnameUrl+'/latest_by_location', requestOptions)
		    .map((res: Response) => res.text() ? res.json() : res);			
	}

	createStockOpname(stockOpname: StockOpname) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(stockOpname);
    	return this.http.post(this.stockOpnameUrl, body, options ).map((res: Response) => res.json());
	}
}