import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterKelasKamar'
})

export class FilterKelasKamarPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.kelas.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}