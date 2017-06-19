import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterObatRusak'
})

export class FilterObatRusakPipe implements PipeTransform {
  transform(items: Array<any>, param1: string, param2: string): Array<any> {
  	if ((!items || !param1) && (!items || !param2)) {
  		return items;
  	}
    if ((!items || !param1)) {
      return items.filter(function(item){
              var param2InKode = item.kode_obat.toString().toLowerCase().indexOf(param2.toLowerCase()) > -1;
              var param2InMerek = item.merek.toLowerCase().indexOf(param2.toLowerCase()) > -1;            
              return (param2InKode || param2InMerek);
      });
    }
    if ((!items || !param2)) {
      return items.filter(item => item.alasan.toLowerCase().indexOf(param1.toLowerCase()) > -1);
    }
    return items.filter(function(item){    
              var param1InAlasan = item.alasan.toLowerCase().indexOf(param1.toLowerCase()) > -1;
              var param2InKode = item.kode_obat.toString().toLowerCase().indexOf(param2.toLowerCase()) > -1;
              var param2InMerek = item.merek.toLowerCase().indexOf(param2.toLowerCase()) > -1;            
              return param1InAlasan && (param2InKode || param2InMerek);
  	})
  }
}