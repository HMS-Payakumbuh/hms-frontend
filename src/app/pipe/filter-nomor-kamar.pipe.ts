import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterNoKamar'
})

export class FilterNomorKamarPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.no_kamar.toLowerCase().indexOf(param.toLowerCase()) > -1);
  }
}