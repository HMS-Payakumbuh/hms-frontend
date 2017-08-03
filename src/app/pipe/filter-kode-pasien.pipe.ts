import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterKodePasien'
})

export class FilterKodePasienPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.pasien.kode_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}