import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType }		from '@angular/http';
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

	downloadHasilLab(id: number) {
		return this.http.get(this.hasilLabUrl + '/download/' + id,  { responseType: ResponseContentType.Blob })
			.map((res) => {
				return new Blob([res.blob()], { type: res.headers.get('Content-Type') });
			})
	}

	getHasilLab(kode_pasien: string): Observable<HasilLab[]> {
		return this.http.get(this.hasilLabUrl + '/' + kode_pasien)
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
}
