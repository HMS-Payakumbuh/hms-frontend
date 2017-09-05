import { Injectable }			from '@angular/core';
import { Headers, Response, RequestOptions, ResponseContentType }		from '@angular/http';
import { AuthHttp }				from 'angular2-jwt';
import { Observable }			from 'rxjs/Rx';

import { ENV }										from '../environment';
import { HasilLab }							from './hasil-lab';

@Injectable()
export class HasilLabService {

	private hasilLabUrl = ENV.hasilLabUrl;

	constructor(
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getHasilLab(kode_pasien: string): Observable<HasilLab[]> {
		return this.authHttp.get(this.hasilLabUrl + '/' + kode_pasien)
      .map((res: Response) => res.json());
	}

	getEmptyHasilLab(no_pegawai: string): Observable<HasilLab[]> {
		return this.authHttp.get(this.hasilLabUrl + '/empty/' + no_pegawai)
			.map((res: Response) => res.json());
	}

	createHasilLab(hasilLab: HasilLab) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(hasilLab);

		return this.authHttp.post(this.hasilLabUrl, body, options)
			.map((res: Response) => res.json());
	}

	uploadHasilLab(event: any, id: number) {
		let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('dokumen', file, file.name);

      let headers = new Headers();
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.authHttp.post(this.hasilLabUrl + '/upload/' + id, formData, options)
        .map((res: Response) => res.json());
    }
	}

	downloadHasilLab(id: number) {
		return this.authHttp.get(this.hasilLabUrl + '/download/' + id,  { responseType: ResponseContentType.Blob })
			.map((res) => {
				return new Blob([res.blob()], { type: res.headers.get('Content-Type') });
			})
	}
}
