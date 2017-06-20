import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterWaktuMasuk'
})
export class FilterWaktuMasukPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){    
              var dateString = item.waktu_masuk.getDate() + "-" + ("0" + (item.waktu_masuk.getMonth() + 1)).slice(-2) + "-" + item.waktu_masuk.getFullYear();
              return dateString.toLowerCase().indexOf(param.toLowerCase()) > -1;
  	})
  }
}