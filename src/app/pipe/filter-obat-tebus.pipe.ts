import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterObatTebus'
})

export class FilterObatTebusPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){
              var paramInIdTransasksi = item.id_transaksi.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInIdPasien = item.id_pasien.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;              
              var paramInNamaPasien = item.nama_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1;
              return paramInIdTransasksi || paramInIdPasien || paramInNamaPasien;
  	});
  }
}