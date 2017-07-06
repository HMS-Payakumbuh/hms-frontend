import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterJenisAntrian',
	pure: false
})

export class FilterJenisAntrianPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.jenis.toString().toLowerCase().indexOf(param.toString().toLowerCase()) > -1);
  }
}