import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterTanggal'
})
export class FilterTanggalPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
    if (!items || !param) {
      return items;
    }
    return items.filter(item => item.waktu_masuk_pasien.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}