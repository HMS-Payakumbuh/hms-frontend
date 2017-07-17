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
              var paramInIdPasien;
              var paramInNamaPasien;

              if (item.resep.eksternal) {
                paramInIdPasien = "EKSTERNAL".toString().toLowerCase().indexOf(param.toLowerCase()) > -1;              
                paramInNamaPasien = item.resep.nama.toLowerCase().indexOf(param.toLowerCase()) > -1;             
              } else {                
                paramInIdPasien = item.transaksi.pasien.id.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;              
                paramInNamaPasien = item.transaksi.pasien.nama_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1;
              }
              return paramInIdPasien || paramInNamaPasien;
  	});
  }
}