import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterWaktuKeluar'
})
export class FilterWaktuKeluarPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){    
              var dateString = item.waktu_keluar.getDate() + "-" + ("0" + (item.waktu_keluar.getMonth() + 1)).slice(-2) + "-" + item.waktu_keluar.getFullYear();
              console.log(dateString);
              console.log(param);
              return dateString.toLowerCase().indexOf(param.toLowerCase()) > -1;
  	})
  }
}