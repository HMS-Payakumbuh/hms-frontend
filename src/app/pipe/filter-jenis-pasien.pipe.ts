import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterJenisPasien'
})
export class FilterJenisPasienPipe implements PipeTransform {
  transform(items: Array<any>, jenis: string): Array<any> {
  	if (!items || !jenis) {
  		return items;
  	}
    return items.filter(item => item.jenis_pasien.toLowerCase() === jenis.toLowerCase());
  }
}