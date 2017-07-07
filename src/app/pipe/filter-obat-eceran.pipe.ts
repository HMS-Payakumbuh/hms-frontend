import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterObatEceran'
})

export class FilterObatEceranPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(function(item){
              var paramInId = item.id.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
              var paramInNama = item.nama_pembeli.toLowerCase().indexOf(param.toLowerCase()) > -1;
              return paramInId || paramInNama;
  	});
  }
}