import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterNoKamar'
})

export class FilterNomorKamarPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
		 return items.filter(function(item){
              var paramInNamaKamar = item.no_kamar.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInNamaPasien = item.nama_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1;              
              return paramInNamaKamar || paramInNamaPasien;
  	})
  }
}