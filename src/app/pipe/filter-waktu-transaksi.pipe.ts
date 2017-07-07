import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterWaktuTransaksi'
})
export class FilterWaktuTransaksiPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){  
              var dateTemp = new Date(item.waktu_transaksi);  
              var dateString = ("0" + dateTemp.getDate()).slice(-2) + "-" + ("0" + (dateTemp.getMonth() + 1)).slice(-2) + "-" + dateTemp.getFullYear();
              return dateString.toLowerCase().indexOf(param.toLowerCase()) > -1;
  	})
  }
}