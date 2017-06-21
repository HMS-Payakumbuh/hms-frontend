import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterPemakaianKamarOperasi'
})

export class FilterPemakaianKamarOperasiPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){
              var paramInNoKamar = item.no_kamar.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;           
              var paramInNamaPasien = item.nama_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInNamaDokterBedah = item.nama_dokter.toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInNamaDokterAnestesi = item.nama_dokter.toLowerCase().indexOf(param.toLowerCase()) > -1;
              return paramInNoKamar || paramInNamaPasien || paramInNamaDokterBedah || paramInNamaDokterAnestesi;
  	});
  }
}