import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
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

	createStockOpname(stockOpname: StockOpname) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(stockOpname);
    	return this.http.post(this.stockOpnameUrl, body, options ).map((res: Response) => res.json());
	}
}