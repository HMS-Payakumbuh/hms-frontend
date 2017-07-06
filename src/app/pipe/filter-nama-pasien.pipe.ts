import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterNamaPasien'
})

export class FilterNamaPasienPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.pasien.nama_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}