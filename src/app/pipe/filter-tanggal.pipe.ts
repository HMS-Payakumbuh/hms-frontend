import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterTanggal'
})
export class FilterTanggalPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.tanggal.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}