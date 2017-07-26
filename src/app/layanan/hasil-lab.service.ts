import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }										from '../environment';
import { HasilLab }							from './hasil-lab';

@Injectable()
export class HasilLabService {

	private hasilLabUrl = ENV.hasilLabUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllHasilLab(): Observable<HasilLab[]> {
		return this.http.get(this.hasilLabUrl)
			.map((res: Response) => res.json());
	}

	getHasilLab(id: number): Observable<HasilLab> {
		return this.http.get(this.hasilLabUrl + '/' + id)
      .map((res: Response) => res.json());
	}

	createHasilLab(event: any, id_transaksi: number, id_tindakan: number) {
		let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
			formData.append('id_transaksi', id_transaksi.toString());
			formData.append('id_tindakan', id_tindakan.toString());
      formData.append('dokumen', file, file.name);

      let headers = new Headers();
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.hasilLabUrl, formData, options)
        .map((res: Response) => res.json());
    }
	}

	updateHasilLab(id: number, hasilLab: HasilLab) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(hasilLab);
		return this.http.put(this.hasilLabUrl + '/' + id, body, options)
			.map((res: Response) => res.json());
	}

	destroyHasilLab(id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		return this.http.delete(this.hasilLabUrl + '/' + id, options)
			.map((res: Response) => res.json());
	}
}
