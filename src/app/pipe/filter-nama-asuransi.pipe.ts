import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterNamaAsuransi'
})
export class FilterNamaAsuransiPipe implements PipeTransform {
  transform(items: Array<any>, nama: string): Array<any> {
  	if (!items || !nama) {
  		return items;
  	}
    return items.filter(item => item.nama_asuransi.toLowerCase() === nama.toLowerCase());
  }
}