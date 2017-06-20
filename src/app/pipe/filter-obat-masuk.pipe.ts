import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterObatMasuk'
})

export class FilterObatMasukPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){
              var paramInKode = item.kode_obat.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInMerek = item.merek.toLowerCase().indexOf(param.toLowerCase()) > -1;             
              return paramInKode || paramInMerek;
  	})
  }
}