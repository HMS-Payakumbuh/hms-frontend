import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterTanggal'
})
export class FilterTanggalPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item) {
    	var dateString = item.tanggal.getDate() + "-" + ("0" + (item.tanggal.getMonth() + 1)).slice(-2) + "-" + item.tanggal.getFullYear();
    	return dateString.toLowerCase().indexOf(param.toLowerCase()) > -1;
    });
  }
}