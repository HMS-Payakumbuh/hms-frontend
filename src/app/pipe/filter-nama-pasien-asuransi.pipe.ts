import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterNamaPasienAsuransi'
})

export class FilterNamaPasienAsuransiPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.asuransi.pasien.nama_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}