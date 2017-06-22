import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterJenisKamar'
})

export class FilterJenisKamarPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.jenis_kamar.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}